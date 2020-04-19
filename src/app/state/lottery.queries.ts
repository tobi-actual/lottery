import { QueryEntity } from '@datorama/akita';
import { LotteryState, LotteryStore } from './lottery.store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Lottery } from './lottery.entity';

@Injectable({
  providedIn: 'root',
})
export class LotteriesQuery extends QueryEntity<LotteryState> {
  lotteryIDs$ = this.selectAll().pipe(
    map((entity) =>
      entity.map((entry) => {
        return entry.id;
      })
    )
  );

  constructor(protected store: LotteryStore) {
    super(store);
  }
}
