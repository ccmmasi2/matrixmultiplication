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
  dataMatrixA!: number[][];
  dataMatrixB!: number[][];
  process: InputCreate | undefined;
  formSubmitted: boolean = false;
  hasUnsavedChanges: boolean = false;
  formReadOnly: boolean = false;
  onSubmitSubject = new Subject<void>();

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
  get currentProcess(): InputCreate {
    const process = this.matrixAForm.value as InputCreate;
    return process;
  }
  
  onSubmit(event: Event): void {
    event.preventDefault();
    this.formSubmitted = true;

    if (this.matrixAForm.valid) { 
      if (!this.currentProcess.processId) {
          this.apiService.addProcess(this.currentProcess).subscribe(
            (process) =>  {
              const message = `Los cambios han sido guardados.`;
              this.formReadOnly = true;
              },
              (error) => {
                console.error('Error:', error);
                const mensaje = `Error creando el usuario.`;
                this.formReadOnly = false;
              }
            );
        this.hasUnsavedChanges = false;
        this.ngOnInit();
      }
    }
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
          console.log("loadProcessData");
          console.log(process);
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
  }

  detectUnsavedChanges() {
    this.hasUnsavedChanges = true;
  }

  handleEditClick(): void {
    this.formReadOnly = false;
  }

  getRange(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  createMatrix(rows: number, columns: number, matrixDetail: MatrixDetail[]): number[][] {
    const matrix = [];
  
    for (let i = 1; i <= rows; i++) {
      const fila = [];
  
      for (let j = 1; j <= columns; j++) {
        const elemento = matrixDetail.find((detail) => detail.row === i && detail.column === j);
  
        if (elemento) {
          fila.push(elemento.value);
        } else {
          fila.push(0);  
        }
      }
  
      matrix.push(fila);
    }
  
    return matrix;
  }
}
