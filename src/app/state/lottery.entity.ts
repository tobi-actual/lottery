import { ID } from '@datorama/akita';

export interface Lottery {
  id: ID;
  name: string;
  participants: string[];
  previousWinners: string[];
}

export type LotteryID = Pick<Lottery, 'id' | 'name'>;

export function createLottery({
  id,
  name,
  participants,
  previousWinners,
}: Partial<Lottery>) {
  return {
    id,
    name,
    participants,
    previousWinners,
  } as Lottery;
}
