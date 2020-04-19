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
  lotteryForm = this.formBuilder.group({
    participants: [''],
    previousWinners: [''],
    lotteries: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    public lotteryService: LotteryService
  ) {}

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
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.lotteryService.updateParticipants(value);
      });

    this.lotteryService.activePreviousWinners$.subscribe((list) => {
      this.lotteryForm.patchValue({
        previousWinners: list,
      });
    });

    this.lotteryForm.controls.previousWinners.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.lotteryService.updatePreviousWinners(value);
      });
  }

  addLottery() {
    const lotteryId = prompt('Please enter the lottery name');
    this.lotteryService.addLottery(lotteryId);
  }

  openFile($event) {
    const file: File = $event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (event: any) => {
      // FileReaderProgressEvent type issue: https://github.com/Microsoft/TypeScript/issues/25510
      this.lotteryService.importState(JSON.parse(event.target.result));
    };

    reader.readAsText(file);
  }
}
