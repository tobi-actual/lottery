import { Store, StoreConfig, ActiveState } from '@datorama/akita';
import { ID } from '@datorama/akita';
import { EntityState, EntityStore } from '@datorama/akita';
import { Lottery } from './lottery.entity';
import { Injectable } from '@angular/core';

export interface LotteryState extends EntityState<Lottery, string>, ActiveState {}

// export function createInitialState(): LotteryState {
//   return {};
// }

const initialState = {
  active: null,
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'lotteries' })
export class LotteryStore extends EntityStore<LotteryState, Lottery> {
  constructor() {
    super(initialState);
    // super(createInitialState());
  }
}
