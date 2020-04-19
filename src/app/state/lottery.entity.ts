import { ID } from '@datorama/akita';

export interface Lottery {
  id: ID;
  participants: string[];
  previousWinners: string[];
}

export function createLottery({
  id,
  participants,
  previousWinners,
}: Partial<Lottery>) {
  return {
    id,
    participants,
    previousWinners,
  } as Lottery;
}
