export const converter = {
  mapToString<T>(map: Map<string, T>): string {
    return JSON.stringify(map, (_, v) => (v instanceof Map ? Array.from(v) : v));
  },
  stringToMap<T>(str = '[]'): Map<string, T> {
    return JSON.parse(str, (k, v) => (k === '' ? new Map(v) : v));
  },
  setToString<T>(set: Set<T>): string {
    return JSON.stringify(set, (_, v) => (v instanceof Set ? Array.from(v) : v));
  },
  stringToSet<T>(str = '[]'): Set<T> {
    return JSON.parse(str, (k, v) => (k === '' ? new Set(v) : v));
  },
};

export const LS = {
  saveMap<T>(key: string, map: Map<string, T>): void {
    localStorage.setItem(key, converter.mapToString(map));
  },
  loadMap<T>(key: string): Map<string, T> {
    return converter.stringToMap(localStorage.getItem(key) ?? '[]');
  },
};

export function getChunk<T>(number: number, length: number, list: T[]): T[] {
  return list.slice(number * length, (number + 1) * length);
}

export const xor = (a: boolean, b: boolean): boolean => (a && b) || (!a && !b);

export function debounce<F extends Callback<F>>(callback: Callback<F>, ms = 350): Callback<F> {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), ms);
  };
}
