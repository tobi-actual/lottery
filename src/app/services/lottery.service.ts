import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LotteryList } from '../models/lists.model';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  lotteryLists$ = new BehaviorSubject<Map<String, LotteryList>>(undefined);
  currentList$ = new Observable<LotteryList>();
  activeList: string;

  constructor() {
    const initialList = new LotteryList();

    const listMap = new Map<String, LotteryList>();

    listMap.set('default', initialList);

    this.activeList = 'default';

    this.lotteryLists$.subscribe((lists) => {
      const activeList = lists.get(this.activeList);
this.activeList.
    });

    this.lotteryLists$.next(listMap);
  }

  updateParticipants(list: string) {
    const convertedList = list.split(',').map((entry) => {
      return entry.trim();
    });
  }
}
