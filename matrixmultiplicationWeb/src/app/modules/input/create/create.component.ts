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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class CreateComponent implements OnInit {
  public matrixAForm!: FormGroup;
  public matrixBForm!: FormGroup;
  public dataMatrixA!: number[][] | null;
  public dataMatrixB!: number[][] | null;
  process: InputCreate | undefined;
  validResult: boolean = true;
  showInsertButton: boolean = false; 

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

  get currentAProcess(): Matrix {
    const process = this.matrixAForm.value as Matrix;
    return process;
  }

  get currentBProcess(): Matrix {
    const process = this.matrixBForm.value as Matrix;
    return process;
  }
  
  saveTransaction(){
    if (this.matrixAForm.valid && this.matrixBForm.valid) {
      let processToSave = this.createObjectToSave(this.matrixAForm.value, this.matrixBForm.value, this.dataMatrixA!, this.dataMatrixB!);
      this.apiService.addProcess(processToSave).subscribe(
      (process) =>  {
          this.ngOnInit();
          alert('Los cambios han sido guardados.');
        },
        (error) => {
          console.error('Error:', error);
          const mensaje = `Error creando el usuario.`;
        }
      );
    }
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
  }

  undoChanges() {
    this.matrixAForm.reset();
    this.matrixBForm.reset();
    this.dataMatrixA = null;
    this.dataMatrixB = null;
  }

  getRange(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  createMatrix(rows: number, columns: number): number[][] {
    const matrix = [];
  
    for (let i = 0; i < rows; i++) {
      const fila = [];
  
      for (let j = 0; j < columns; j++) {
        fila.push(0);
      }
  
      matrix.push(fila);
    }
  
    return matrix;
  }

  generateTables(){
    if (this.matrixAForm.valid && this.matrixBForm.valid) { 
      this.dataMatrixA = this.createMatrix(this.currentAProcess.rows, this.currentAProcess.columns);
      this.dataMatrixB = this.createMatrix(this.currentBProcess.rows, this.currentBProcess.columns);
      this.showInsertButton = true;
      
      if(this.currentAProcess.columns != this.currentBProcess.rows){
        this.validResult = false;
      }
      else{
        this.validResult = true;
      }
    }
    else {
      this.undoChanges();
      this.showInsertButton = false;
    }
  }

  createObjectToSave(matrixA: Matrix, matrixB: Matrix, dataMatrixA: number[][], dataMatrixB: number[][]): ProcessPpal {
    let arrayDetailA: MatrixDetail[] = this.createDetailFromMatrix(dataMatrixA);
    let arrayDetailB: MatrixDetail[] = this.createDetailFromMatrix(dataMatrixB);
    
    let processToSave: ProcessPpal = {
      processID: 1,
      processDate: new Date(),
      processStatus: this.validResult,
      matrix: [
        {
          matrixName: 'A',
          rows: matrixA.rows,
          columns: matrixA.columns,
          detail: arrayDetailA
        },
        {
          matrixName: 'B',
          rows: matrixB.rows,
          columns: matrixB.columns,
          detail: arrayDetailB
        }
      ]
    } 

    return processToSave;
  } 

  createDetailFromMatrix(dataMatrix: number[][]): MatrixDetail[] {
    let arrayDetailA: MatrixDetail[] = [];

    for (let i = 0; i < dataMatrix.length; i++) {
      for (let j = 0; j < dataMatrix[i].length; j++) {
        const cellValue = dataMatrix[i][j];
        let detailA: MatrixDetail = {
          row: i + 1,
          column: j + 1,
          value: cellValue
        };
        arrayDetailA.push(detailA);
      }
    }

    return arrayDetailA;
  }
}
