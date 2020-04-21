import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { LotteryID } from './lottery.entity';
import { LotteryState, LotteryStore } from './lottery.store';

@Injectable({
  providedIn: 'root',
})
export class LotteriesQuery extends QueryEntity<LotteryState> {
  lotteryIDs$ = this.selectAll().pipe(
    map((entity) =>
      entity.map((entry) => {
        return { id: entry.id, name: entry.name } as LotteryID;
      })
    )
  );

  constructor(protected store: LotteryStore) {
    super(store);
  }
}
