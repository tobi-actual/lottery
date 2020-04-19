import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { LotteryService } from './services/lottery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // lotteryForm = new FormControl('');
  // lotteryForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  lotteryForm = this.formBuilder.group({
    participants: [''],
    previousWinners: [''],
    lists: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private lotteryService: LotteryService
  ) {
    // lotteryForm = this.formBuilder.group({
    //   participants: [''],
    //   previousWinners: [''],
    //   lists: [''],
    // });

    this.lotteryForm.controls.participants.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        console.log(value);
        this.lotteryService.updateParticipants(value);
      });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.lotteryForm.value);
  }
}
