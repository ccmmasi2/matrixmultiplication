import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { inputList } from '@app/models/inputList.model';
import { ApiService } from '@app/services/api-service';
import { ActionsDialogComponent } from '@app/shared/components/actions-dialog/actions-dialog.component';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource<inputList>([]);
  inputListOptions: inputList[] = [];
  displayedColumns: string[] = ['id', 'date', 'matrixA', 'matrixB', 'status', 'action'];

  constructor(
    private router: Router,
    public apiService: ApiService,
    private dialog: MatDialog,
  ){
    this.dataSource = new MatTableDataSource<inputList>([]);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.inputListOptions);
    this.loadinputListOptions();
  }

  loadinputListOptions(): void {
    this.apiService
      .getListInputOptions()
      .subscribe((info) => {
        if (info) {
          this.inputListOptions = info;
          this.dataSource.data = this.inputListOptions;
        }
      });
  }

  redirectBack(): void {
    this.router.navigate(['']);
  }

  redirectCreate(): void {
    this.router.navigate(['input/create']);
  }
  
  openActionsDialog(event: MouseEvent, element: any) {
    const offsetX = 120;
    const offsety = 20;
    this.dialog.open(ActionsDialogComponent, {
      //data: { user: userObject },
      position: {
        top: event.clientY - offsety + 'px',
        left: event.clientX - offsetX + 'px',
      },
    });
  }
}
