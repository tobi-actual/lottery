/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncryptionService } from './encryption.service';

describe('Service: Encryption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptionService],
    });
  });

  it('should exist', inject(
    [EncryptionService],
    (service: EncryptionService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should encrypt and decrypt a string', async (done) => {
    const service: EncryptionService = TestBed.inject(EncryptionService);
    expect(service).toBeTruthy();

    const message = 'This is a test';

    const encrypted = await service.encrypt(message);

    const decrypted = await service.decrypt(encrypted.data, encrypted.encryptionKey);

    expect(decrypted).toEqual(message);

    done();
  });

  it('should encrypt and decrypt an object', async (done) => {
    const service: EncryptionService = TestBed.inject(EncryptionService);
    expect(service).toBeTruthy();

    const data = { message: 'This is a test', answer: 42 };

    const encrypted = await service.encrypt(data);

    const decrypted = await service.decrypt(encrypted.data, encrypted.encryptionKey);

    expect(decrypted.message).toEqual(data.message);
    expect(decrypted.answer).toEqual(data.answer);

    done();
  });
});
