import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LotteryList } from '../models/lists.model';
import { ID } from '@datorama/akita';
import { map, distinctUntilChanged, filter, first, take } from 'rxjs/operators';
import { LotteryStore } from '../state/lottery.store';
import { LotteriesQuery } from '../state/lottery.queries';
import { createLottery } from '../state/lottery.entity';
import { snapshotManager } from '@datorama/akita';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  lotteryIDs$: Observable<string[]>;

  activeID$: Observable<string>;
  activeParticipants$: Observable<string>;
  activePreviousWinners$: Observable<string>;

  currentWinners$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor(
    private lotteryStore: LotteryStore,
    private lotteriesQuery: LotteriesQuery
  ) {
    //Add some sample data, if there is none:
    if (this.lotteriesQuery.getCount() === 0) {
      this.lotteryStore.add(
        createLottery({
          id: 'default',
          participants: [
            'Tobi',
            'Mr. White',
            'Mr. Orange',
            'Mr. Blonde',
            'Mr. Pink',
            'Mr. Blue',
            'Mr. Brown',
            'Leingschwendner Sepp',
            'Saller Wolfi',
            'Ziagla Fritz',
            'Weber Max',
          ],
          previousWinners: [],
        })
      );

      this.lotteryStore.setActive('default');
    }

    this.lotteryIDs$ = this.lotteriesQuery.lotteryIDs$.pipe(
      map((id) => {
        return id.map((entry) => {
          return entry as string;
        });
      })
    );

    this.activeID$ = this.lotteriesQuery.selectActiveId().pipe(
      map((id) => {
        return id as string;
      })
    );

    this.activeParticipants$ = this.lotteriesQuery.selectActive().pipe(
      filter((x) => x !== undefined),
      map((lottery) => {
        return this.convertArrayToString(lottery.participants);
      }),
      distinctUntilChanged()
    );
    this.activePreviousWinners$ = this.lotteriesQuery.selectActive().pipe(
      filter((x) => x !== undefined),
      map((lottery) => {
        return this.convertArrayToString(lottery.previousWinners);
      }),
      distinctUntilChanged()
    );
  }

  pickAWinner() {
    const activeLottery = this.lotteriesQuery.getActive();

    if (!activeLottery) {
      alert('A lottery needs to be added first');
      return;
    }

    let participants = activeLottery.participants;
    let previousWinners = activeLottery.previousWinners;

    if (participants.length === 0 && previousWinners.length > 0) {
      // All participants won. Reset the list:
      participants = [...previousWinners];
      previousWinners = [];
      this.currentWinners$.next([]);
    }

    const winnerId = Math.floor(Math.random() * participants.length);

    // const winner = activeLottery.participants.splice(winnerId);

    const winner = participants[winnerId];

    const newParticipants = participants.filter(function (v, index) {
      return index !== winnerId;
    });

    const newPreviousWinners = [...previousWinners, winner];

    const winners = this.currentWinners$.value;
    winners.push(winner);
    this.currentWinners$.next(winners);

    this.lotteryStore.updateActive({
      participants: newParticipants,
      previousWinners: newPreviousWinners,
    });
  }

  resetWinners() {
    this.currentWinners$.next([]);
  }

  setActiveLottery(id: ID) {
    this.currentWinners$.next([]);
    this.lotteryStore.setActive(id);
  }

  addLottery(id: string) {
    this.lotteryStore.add(
      createLottery({ id: id, participants: [], previousWinners: [] })
    );
    this.lotteryStore.setActive(id);
  }

  deleteActiveLottery() {
    const reallyDelete = confirm('Delete Lottery?');
    if (reallyDelete) {
      this.lotteryStore.remove(this.lotteriesQuery.getActiveId());
      this.lotteriesQuery
        .selectFirst()
        .pipe(
          take(1),
          filter((x) => x !== undefined)
        )
        .subscribe((first) => {
          this.setActiveLottery(first.id);
        });
    }
  }

  updateParticipants(list: string) {
    this.lotteryStore.updateActive({
      participants: this.convertStringToArray(list),
    });
  }

  updatePreviousWinners(list: string) {
    this.lotteryStore.updateActive({
      previousWinners: this.convertStringToArray(list),
    });
  }

  private convertStringToArray(list: string) {
    const array = list.split(',').map((entry) => {
      return entry.trim();
    });
    return array.filter(Boolean);
  }

  private convertArrayToString(list: string[]): string {
    return list.join(', ');
  }

  exportState() {
    const blob: Blob = new Blob(
      [JSON.stringify(snapshotManager.getStoresSnapshot(), null, 2)],
      {
        type: 'text/plain;charset=utf-8',
      }
    );
    saveAs(blob, 'lotteries.json', true);
  }

  importState(stores?: string[]) {
    snapshotManager.setStoresSnapshot(stores);
  }
}
