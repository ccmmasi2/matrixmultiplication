import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InputCreate } from '@app/models/inputCreate.model';
import { ApiService } from '@app/services/api-service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})

export class CreateComponent implements OnInit {
  public matrixForm!: FormGroup;
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
    this.matrixForm = this.formBuilder.group({
      rowsMatrixA: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
      columnsMatrixA: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
      rowsMatrixB: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
      columnsMatrixB: [null, [Validators.required, Validators.min(1), Validators.max(5), ]],
    });
  }

  get currentProcess(): InputCreate {
    const process = this.matrixForm.value as InputCreate;
    return process;
  }

  ngOnInit(): void {
    this.loadProcess();
  }
  
  loadProcess(): void {
    this.activateRoute.params.subscribe((params) => {
      const processId = +params['processId'];
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
        this.matrixForm.reset(process);
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.formSubmitted = true;

    if (this.matrixForm.valid) { 
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

  undoChanges() {
    this.matrixForm.reset();
  }

  detectUnsavedChanges() {
    this.hasUnsavedChanges = true;
  }

  handleEditClick(): void {
    this.formReadOnly = false;
  }
}
