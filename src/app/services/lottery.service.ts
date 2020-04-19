import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LotteryList } from '../models/lists.model';
import { ID } from '@datorama/akita';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { LotteryStore } from '../state/lottery.store';
import { LotteriesQuery } from '../state/lottery.queries';
import { createLottery } from '../state/lottery.entity';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  // lotteryLists$ = new BehaviorSubject<Map<String, LotteryList>>(undefined);
  // currentList$ = new Observable<LotteryList>();
  // activeList: string;

  lotteryIDs$: Observable<ID[]>;

  activeID$: Observable<ID>;
  activeParticipants$: Observable<string>;
  activePreviousWinners$: Observable<string>;

  constructor(
    private lotteryStore: LotteryStore,
    private lotteriesQuery: LotteriesQuery
  ) {
    this.lotteryStore.add(
      createLottery({ id: 'default', participants: [], previousWinners: [] })
    );

    this.lotteryStore.setActive('default');

    // const initialList = new LotteryList();

    // const listMap = new Map<String, LotteryList>();

    // listMap.set('default', initialList);

    // this.activeList = 'default';

    // this.lotteryLists$.subscribe((lists) => {
    //   const activeList = lists.get(this.activeList);
    //   // this.activeList.
    // });

    // this.lotteryLists$.next(listMap);

    this.lotteryIDs$ = this.lotteriesQuery.lotteryIDs$;

    this.activeID$ = this.lotteriesQuery.selectActiveId();
    this.activeParticipants$ = this.lotteriesQuery.selectActive().pipe(
      map((lottery) => {
        return lottery.participants.join(', ');
      }),
      distinctUntilChanged()
    );
    this.activePreviousWinners$ = this.lotteriesQuery.selectActive().pipe(
      map((lottery) => {
        return lottery.previousWinners.join(', ');
      }),
      distinctUntilChanged()
    );
  }

  setActiveLottery(id: string) {
    this.lotteryStore.setActive(id);
  }

  addLottery(id: string) {
    this.lotteryStore.add(
      createLottery({ id: id, participants: [], previousWinners: [] })
    );
  }

  updateParticipants(list: string) {
    const convertedList = list.split(',').map((entry) => {
      return entry.trim();
    });

    this.lotteryStore.updateActive({
      participants: convertedList,
    });
  }
}
