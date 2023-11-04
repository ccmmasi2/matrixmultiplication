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
  public matrixAForm!: FormGroup;
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
  }

  get currentProcess(): InputCreate {
    const process = this.matrixAForm.value as InputCreate;
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
        console.log(process?.matrix[0]);
        this.matrixAForm.reset(process?.matrix[0]);
      });
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

  undoChanges() {
    this.matrixAForm.reset();
  }

  detectUnsavedChanges() {
    this.hasUnsavedChanges = true;
  }

  handleEditClick(): void {
    this.formReadOnly = false;
  }
}
