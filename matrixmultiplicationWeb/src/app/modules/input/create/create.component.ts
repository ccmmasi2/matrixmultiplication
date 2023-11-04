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
  styleUrls: ['./create.component.scss'],
})

export class CreateComponent implements OnInit {
  public matrixAForm!: FormGroup;
  public matrixBForm!: FormGroup;
  dataMatrixA!: number[][] | null;
  dataMatrixB!: number[][] | null;
  process: InputCreate | undefined;
  formReadOnly: boolean = false;

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
  
  onSubmit(event: Event): void {
    // event.preventDefault();

    // if (this.matrixAForm.valid) { 
    //   if (!this.currentProcess.processId) {
    //       this.apiService.addProcess(this.currentProcess).subscribe(
    //         (process) =>  {
    //           const message = `Los cambios han sido guardados.`;
    //           this.formReadOnly = true;
    //           },
    //           (error) => {
    //             console.error('Error:', error);
    //             const mensaje = `Error creando el usuario.`;
    //             this.formReadOnly = false;
    //           }
    //         );
    //     this.hasUnsavedChanges = false;
    //     this.ngOnInit();
    //   }
    // }
  }

  /* */

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
  }

  undoChanges() {
    this.matrixAForm.reset();
    this.matrixBForm.reset();
    this.dataMatrixA = null;
    this.dataMatrixB = null;
  }

  handleEditClick(): void {
    this.formReadOnly = false;
  }

  getRange(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
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

  generateTables(){
    if (this.matrixAForm.valid && this.matrixBForm.valid) { 
      this.dataMatrixA = this.createMatrix(this.currentAProcess.rows, this.currentAProcess.columns, null);
      this.dataMatrixB = this.createMatrix(this.currentBProcess.rows, this.currentBProcess.columns, null);
    }
    else {
      this.undoChanges();
    }
  }
}
