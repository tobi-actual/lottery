import { Injectable } from '@angular/core';
import { LotteryService } from './lottery.service';
import { LotteryStore } from '../state/lottery.store';
import {
  convertStringToArray,
  convertArrayToString,
  convertTasksToString,
} from './utils';
import { Observable } from 'rxjs';
import { LotteriesQuery } from '../state/lottery.queries';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Tasks } from '../state/lottery.entity';

export interface AssignedTask {
  name: string;
  assignees: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BatchAssignerService {
  activeTasks$: Observable<string>;
  assignedTasks$: Observable<AssignedTask[]>;

  constructor(
    private lotteryStore: LotteryStore,
    private lotteryService: LotteryService,
    private lotteriesQuery: LotteriesQuery
  ) {
    this.activeTasks$ = this.lotteriesQuery.selectActive().pipe(
      filter((x) => x !== undefined),
      map((lottery) => {
        return convertTasksToString(lottery.assignedTasks);
      }),
      distinctUntilChanged()
    );

    this.assignedTasks$ = this.lotteriesQuery.selectActive().pipe(
      filter((x) => x !== undefined),
      map((lottery) => {
        const result: AssignedTask[] = [];
        let i = 0;
        for (var key in lottery.assignedTasks) {
          const task = lottery.assignedTasks[key];
          result.push({
            name: key,
            assignees: task,
          });
        }

        return result;
      }),
      distinctUntilChanged()
    );
  }

  updateTasks(listString: string) {
    const list = convertStringToArray(listString);

    const activeLottery = this.lotteriesQuery.getActive();

    if (list.length > 0 && activeLottery) {
      let currentMap;
      if (activeLottery.assignedTasks) {
        currentMap = JSON.parse(
          JSON.stringify(activeLottery.assignedTasks)
        ) as Tasks;
      } else {
        currentMap = new Tasks();
      }

      for (var key in currentMap) {
        if (!list.includes(key)) {
          delete currentMap[key];
        }
      }

      list.forEach((task) => {
        if (!currentMap[task]) {
          currentMap[task] = [];
        }
      });

      this.lotteryStore.updateActive({
        assignedTasks: currentMap,
      });
    }
  }

  assignTasks(maxAssignmentsPerTaskInput: string) {
    const maxAssignmentsPerTask = Number(maxAssignmentsPerTaskInput);

    const activeLottery = this.lotteriesQuery.getActive();
    if (!activeLottery) {
      return;
    }

    const numberOfParticipants = activeLottery.participants.length;

    let assignTasks = JSON.parse(
      JSON.stringify(activeLottery.assignedTasks)
    ) as Tasks;

    for (let index = 0; index < numberOfParticipants; index++) {
      let winner;

      // Calculate points for every task. Assign to the one with the least points:
      const pointsList: { name: string; points: number }[] = [];

      for (var task in assignTasks) {
        const length = assignTasks[task].length;
        if (length >= maxAssignmentsPerTask) {
          continue;
        }
        let points = -length;

        if (!winner) {
          winner = this.lotteryService.pickAWinner(false);
        }
        if (!assignTasks[task].includes(winner)) {
          points++;
        }
        pointsList.push({ name: task, points: points });
      }

      pointsList.sort((e1, e2) => e2.points - e1.points);

      if (pointsList[0]) {
        assignTasks[pointsList[0].name].push(winner);
      }
    }

    this.lotteryStore.updateActive({
      assignedTasks: assignTasks,
    });
  }

  resetAssignments() {
    const activeLottery = this.lotteriesQuery.getActive();
    if (!activeLottery) {
      return;
    }

    let assignTasks = JSON.parse(
      JSON.stringify(activeLottery.assignedTasks)
    ) as Tasks;

    for (var task in assignTasks) {
      assignTasks[task] = [];
    }

    this.lotteryStore.updateActive({
      assignedTasks: assignTasks,
    });
  }
}
