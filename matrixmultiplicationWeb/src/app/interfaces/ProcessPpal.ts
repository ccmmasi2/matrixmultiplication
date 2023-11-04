import { Matrix } from "./Matrix";

export interface ProcessPpal {
  processID: number;
  processDate: Date;
  processStatus: boolean;
  matrix: Matrix[];
}