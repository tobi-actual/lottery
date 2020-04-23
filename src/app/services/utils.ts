import { Tasks } from '../state/lottery.entity';

/**
 * Converts a list with comma or new line separation to an array
 */
export function convertStringToArray(listString: string) {
  const array = listString
    .replace(/\n/g, ',')
    .split(',')
    .map((entry) => {
      return entry.trim();
    });
  return array.filter(Boolean);
}

export function convertArrayToString(list: string[]): string {
  return list.join('\n');
}

export function convertTasksToString(tasks: Tasks): string {
  const list = [];

  for (var key in tasks) {
    list.push(key);
  }
  return list.join('\n');
}
