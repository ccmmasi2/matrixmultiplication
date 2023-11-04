import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { inputList } from '@app/models/inputList.model';
import { EventService } from '@app/services/EventService';
import { ApiService } from '@app/services/api-service';
import { ActionsDialogComponent } from '@app/shared/components/actions-dialog/actions-dialog.component';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})

export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource<inputList>([]);
  inputListOptions: inputList[] = [];
  displayedColumns: string[] = ['processId', 'date', 'matrixA', 'matrixB', 'status', 'action'];

  constructor(
    private router: Router,
    public apiService: ApiService,
    private dialog: MatDialog,
    private eventService: EventService
  ){
    this.dataSource = new MatTableDataSource<inputList>([]);

    this.eventService.watchButtonClick.subscribe((processId: number) => {
      this.goToWatch(processId);
    });
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
  
  openActionsDialog(event: MouseEvent, row: any) {
    const userObject: inputList = row as inputList;
    const offsetX = 120;
    const offsety = 20;
    this.dialog.open(ActionsDialogComponent, {
      data: { processId: userObject.processId },
      position: {
        top: event.clientY - offsety + 'px',
        left: event.clientX - offsetX + 'px',
      },
    });
  }

  goToWatch(processId: number) {
    this.router.navigate(['input/view', processId]);
  }
}
