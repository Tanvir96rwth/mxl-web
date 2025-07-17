export type rHS = (t: number, y: Array<number>, pars: Array<number>) => Array<number>;

export { integrate } from "./explicit/euler";
