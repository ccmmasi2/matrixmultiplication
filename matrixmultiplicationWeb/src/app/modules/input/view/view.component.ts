import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Matrix } from '@app/interfaces/Matrix';
import { MatrixDetail } from '@app/interfaces/MatrixDetail';
import { ProcessPpal } from '@app/interfaces/ProcessPpal';
import { InputCreate } from '@app/models/inputCreate.model';
import { ApiService } from '@app/services/api-service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  public matrixAForm!: FormGroup;
  public matrixBForm!: FormGroup;
  dataMatrixA!: number[][] | null;
  dataMatrixB!: number[][] | null;
  validResult: boolean = true;
  isDisabled: boolean = true;
  
  constructor(
    public apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.matrixAForm = this.formBuilder.group({
      rows: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
      columns: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
    });
    this.matrixBForm = this.formBuilder.group({
      rows: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
      columns: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
    }); 
  } 

  /* */
  get currentAProcess(): Matrix {
    const process = this.matrixAForm.value as Matrix;
    return process;
  }

  get currentBProcess(): Matrix {
    const process = this.matrixBForm.value as Matrix;
    return process;
  }

  ngOnInit(): void {
    this.loadProcess();
  } 
  
  loadProcess(): void {
    this.activateRoute.params.subscribe((params) => {
      const processId = +params['id'];
      if (!isNaN(processId)) {
        this.loadProcessData(processId);
      }
    });
  }
  
  loadProcessData(processId: number): void {
    this.activateRoute.params
      .pipe(switchMap(() => this.apiService.getProcessById(processId)))
      .subscribe((process) => {
        if (!process) {
          this.router.navigate(['']);
        }
        else{
          this.fillValuesFromDB(process);
        }
      });
  }

  fillValuesFromDB(process: ProcessPpal){
    this.matrixAForm.reset(process?.matrix[0]);
    this.matrixBForm.reset(process?.matrix[1]);
    this.dataMatrixA = this.createMatrix(process?.matrix[0].rows, process?.matrix[0].columns, process?.matrix[0].detail);
    this.dataMatrixB = this.createMatrix(process?.matrix[1].rows, process?.matrix[1].columns, process?.matrix[1].detail);
    this.validResult = process.processStatus;
  } 

  createMatrix(rows: number, columns: number, matrixDetail: MatrixDetail[] | null): number[][] {
    const matrix = [];
  
    for (let i = 1; i <= rows; i++) {
      const fila = [];
  
      for (let j = 1; j <= columns; j++) {
        let elemento = 0;
        if(matrixDetail){
            elemento = matrixDetail.find((detail) => detail.row === i && detail.column === j)!.value;
        }
        fila.push(elemento);
      }
  
      matrix.push(fila);
    }
  
    return matrix;
  }
}
