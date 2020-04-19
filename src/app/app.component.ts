import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { LotteryService } from './services/lottery.service';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // lotteryForm = new FormControl('');
  // lotteryForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  lotteryForm = this.formBuilder.group({
    participants: [''],
    previousWinners: [''],
    lotteries: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    public lotteryService: LotteryService
  ) {
    // lotteryForm = this.formBuilder.group({
    //   participants: [''],
    //   previousWinners: [''],
    //   lists: [''],
    // });
  }

  ngOnInit(): void {
    this.lotteryService.activeID$.subscribe((id) => {
      this.lotteryForm.patchValue({
        lotteries: id,
      });
    });

    this.lotteryForm.controls.lotteries.valueChanges.subscribe((id) => {
      this.lotteryService.setActiveLottery(id);
    });

    this.lotteryService.activeParticipants$.subscribe((list) => {
      this.lotteryForm.patchValue({
        participants: list,
      });
    });

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

  addLottery() {
    const lotteryId = prompt('Please enter the lottery name');
    this.lotteryService.addLottery(lotteryId);
  }
}
