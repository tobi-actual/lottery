import { ID } from '@datorama/akita';

export class Tasks {
  [index: string]: string[];
}

export interface Lottery {
  id: ID;
  name: string;
  participants: string[];
  previousWinners: string[];
  // ES 6 Map doesn't work with the state store/restore:
  assignedTasks: Tasks;
}

export type LotteryID = Pick<Lottery, 'id' | 'name'>;

export function createLottery({
  id,
  name,
  participants,
  previousWinners,
  assignedTasks
}: Partial<Lottery>) {
  return {
    id,
    name,
    participants,
    previousWinners,
    assignedTasks
  } as Lottery;
}
