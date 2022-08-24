import { writable } from 'svelte/store';

export interface Solve {
    time: number
    scramble: String[]
    timestamp?: Date
    mean3?: number
    avg5?: number
    avg12?: number
}

let solvesData: Solve[] = []
export const count = writable(0);
export const scramble = writable([] as String[]);
export const solves = writable(solvesData)