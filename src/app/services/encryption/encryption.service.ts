import { Injectable } from '@angular/core';
import { Data, EncryptionResult } from './encryption.model';
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = require('base-x')(BASE58);

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  // TODO: Delete:
  private symmetricKey: string;

  async encrypt(content: any, symmetricKey?): Promise<EncryptionResult> {
    const adata = [];

    if (
      !symmetricKey ||
      (typeof symmetricKey === 'string' && symmetricKey === '')
    ) {
      symmetricKey = this.getSymmetricKey();
    }
    // if (!data.hasOwnProperty('adata')) {
    //   data.adata = [];
    // }
    const cipherResult = await this.cipher(
      symmetricKey,
      JSON.stringify(content),
      adata
    );

    const data: Data = {
      ct: cipherResult[0],
      adata: cipherResult[1],
    };

    return {
      data,
      encryptionKey: symmetricKey,
    };
  }

  async decrypt(cipherdata: Data, key: string): Promise<any> {
    return JSON.parse(
      await this.decipher(key, [cipherdata.ct, cipherdata.adata])
    );
  }

  generateURL(id: string, encryptionResult: EncryptionResult) {
    const baseUri = this.baseUri() + '?';
    const url =
      baseUri + id + '#' + this.base58encode(encryptionResult.encryptionKey);

    // show new URL in browser bar
    // history.pushState({type: 'newpaste'}, document.title, url);
  }

  private async cipher(key, message, adata) {
    // AES in Galois Counter Mode, keysize 256 bit,
    // authentication tag 128 bit, 10000 iterations in key derivation
    const spec = [
      this.getRandomBytes(16), // initialization vector
      this.getRandomBytes(8), // salt
      100000, // iterations
      256, // key size
      128, // tag size
      'aes', // algorithm
      'gcm', // algorithm mode
    ];
    const encodedSpec = [];
    for (let i = 0; i < spec.length; ++i) {
      encodedSpec[i] = i < 2 ? btoa(String(spec[i])) : spec[i];
    }
    adata[0] = encodedSpec;

    // finally, encrypt message
    return [
      btoa(
        this.arraybufferToString(
          await window.crypto.subtle.encrypt(
            this.cryptoSettings(JSON.stringify(adata), spec),
            await this.deriveKey(key, spec),
            await this.stringToArraybuffer(this.utf16To8(message))
          )
        )
      ),
      adata,
    ];
  }

  /**
   * decrypt message with key, then decompress
   *
   * @name   CryptTool.decipher
   * @async
   * @function
   * @param  {string} key
   * @param  {string} password
   * @param  {string|object} data encrypted message
   * @return {string} decrypted message, empty if decryption failed
   */
  private async decipher(key, data: Array<any>) {
    let adataString;
    let spec;
    let cipherMessage;
    let plaintext;

    if (data instanceof Array) {
      // version 2
      adataString = JSON.stringify(data[1]);
      // clone the array instead of passing the reference
      spec = (data[1][0] instanceof Array ? data[1][0] : data[1]).slice();
      cipherMessage = data[0];
    } else {
      throw Error('unsupported message format');
    }
    spec[0] = atob(spec[0]);
    spec[1] = atob(spec[1]);
    try {
      plaintext = await window.crypto.subtle.decrypt(
        this.cryptoSettings(adataString, spec),
        await this.deriveKey(key, spec),
        this.stringToArraybuffer(atob(cipherMessage))
      );
    } catch (err) {
      console.error(err);
      return '';
    }
    return await this.utf8To16(this.arraybufferToString(plaintext));
  }

  private getRandomBytes(length) {
    let bytes = '';
    const byteArray = new Uint8Array(length);
    window.crypto.getRandomValues(byteArray);
    for (let i = 0; i < length; ++i) {
      bytes += String.fromCharCode(byteArray[i]);
    }
    return bytes;
  }

  private arraybufferToString(messageArray) {
    const array = new Uint8Array(messageArray);
    let message = '';
    let i = 0;
    while (i < array.length) {
      message += String.fromCharCode(array[i++]);
    }
    return message;
  }

  private cryptoSettings(adata, spec) {
    return {
      // can be any supported AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH" or "HMAC")
      name: 'AES-' + spec[6].toUpperCase(),
      iv: this.stringToArraybuffer(spec[0]), // the initialization vector you used to encrypt
      additionalData: this.stringToArraybuffer(adata), // the addtional data you used during encryption (if any)
      tagLength: spec[4], // the length of the tag you used to encrypt (if any)
    };
  }

  private stringToArraybuffer(message) {
    const messageArray = new Uint8Array(message.length);
    for (let i = 0; i < message.length; ++i) {
      messageArray[i] = message.charCodeAt(i);
    }
    return messageArray;
  }

  /**
   * derive cryptographic key from key string and password
   *
   * @name   CryptTool.deriveKey
   * @async
   * @function
   * @private
   * @param  {string} key
   * @param  {string} password
   * @param  {array}  spec cryptographic specification
   * @return {CryptoKey} derived key
   */
  private async deriveKey(key, spec) {
    const keyArray = this.stringToArraybuffer(key);

    // import raw key
    // @ts-ignore
    const importedKey = await window.crypto.subtle.importKey(
      'raw', // only 'raw' is allowed
      keyArray,
      { name: 'PBKDF2' }, // we use PBKDF2 for key derivation
      false, // the key may not be exported
      ['deriveKey'] // we may only use it for key derivation
    );

    // derive a stronger key for use with AES
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2', // we use PBKDF2 for key derivation
        salt: this.stringToArraybuffer(spec[1]), // salt used in HMAC
        iterations: spec[2], // amount of iterations to apply
        hash: { name: 'SHA-256' }, // can be "SHA-1", "SHA-256", "SHA-384" or "SHA-512"
      },
      importedKey,
      {
        // can be any supported AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM",
        // "AES-CFB", "AES-KW", "ECDH", "DH" or "HMAC")
        name: 'AES-' + spec[6].toUpperCase(),
        length: spec[3], // can be 128, 192 or 256
      },
      false, // the key may not be exported
      ['encrypt', 'decrypt'] // we may only use it for en- and decryption
    );
  }

  private getSymmetricKey() {
    return this.getRandomBytes(32);
  }

  private getKey() {
    if (this.symmetricKey === null) {
      let newKey = window.location.hash.substring(1);
      if (newKey === '') {
        throw Error('no encryption key given');
      }

      // Some web 2.0 services and redirectors add data AFTER the anchor
      // (such as &utm_source=...). We will strip any additional data.
      const ampersandPos = newKey.indexOf('&');
      if (ampersandPos > -1) {
        newKey = newKey.substring(0, ampersandPos);
      }

      // version 2 uses base58, version 1 uses base64 without decoding
      try {
        // base58 encode strips NULL bytes at the beginning of the
        // string, so we re-add them if necessary
        this.symmetricKey = this.base58decode(newKey).padStart(32, '\u0000');
      } catch (e) {
        this.symmetricKey = newKey;
      }
    }

    return this.symmetricKey;
  }

  private base58encode(input) {
    return base58.encode(this.stringToArraybuffer(input));
  }

  private base58decode(input) {
    return this.arraybufferToString(base58.decode(input));
  }

  private utf16To8(message) {
    return encodeURIComponent(message).replace(
      /%([0-9A-F]{2})/g,
      (match, hexCharacter) => {
        return String.fromCharCode(parseInt('0x' + hexCharacter, 16));
      }
    );
  }

  private utf8To16(message) {
    return decodeURIComponent(
      message
        .split('')
        .map((character) => {
          return '%' + ('00' + character.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  private baseUri() {
    // if (baseUri !== null) {
    //     return baseUri;
    // }

    const baseUri = window.location.origin + window.location.pathname;
    return baseUri;
  }
}
