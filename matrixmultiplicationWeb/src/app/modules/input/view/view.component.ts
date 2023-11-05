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
  public matrixCForm!: FormGroup;
  dataMatrixA!: number[][] | null;
  dataMatrixB!: number[][] | null;
  dataMatrixC!: number[][] | null;
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
      rows: [null],
      columns: [null],
    });
    this.matrixBForm = this.formBuilder.group({
      rows: [null],
      columns: [null],
    }); 
    this.matrixCForm = this.formBuilder.group({
      rows: [null],
      columns: [null],
    }); 
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
    this.validResult = process.processStatus;
    this.matrixAForm.reset(process?.matrix[0]);
    this.matrixBForm.reset(process?.matrix[1]);
    this.matrixCForm.reset(process?.matrix[2]);
    this.dataMatrixA = this.createMatrix(process?.matrix[0].rows, process?.matrix[0].columns, process?.matrix[0].detail);
    this.dataMatrixB = this.createMatrix(process?.matrix[1].rows, process?.matrix[1].columns, process?.matrix[1].detail);
    this.dataMatrixC = this.createMatrix(process?.matrix[2].rows, process?.matrix[2].columns, process?.matrix[2].detail);
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

  redirectCreate(): void {
    this.router.navigate(['input/create']);
  }
}
