import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '@app/services/EventService';

@Component({
  selector: 'app-actions-dialog',
  templateUrl: './actions-dialog.component.html',
})

export class ActionsDialogComponent implements OnInit { 
  processId!: number;

  constructor(
    public dialogRef: MatDialogRef<ActionsDialogComponent>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.processId = this.data.processId;
  }
 
  invokeWatchClickEvent() {
    this.eventService.emitWatchButtonClick(this.processId);
    this.dialogRef.close(); 
  }
}
