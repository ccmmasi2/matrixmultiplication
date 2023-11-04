import { MatrixDetail } from "./MatrixDetail";

export interface Matrix {
    matrixName: string;
    rows: number;
    columns: number;
    detail: MatrixDetail[];
  }