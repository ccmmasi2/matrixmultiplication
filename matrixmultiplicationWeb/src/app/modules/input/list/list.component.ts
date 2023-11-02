import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { inputList } from '@app/models/inputList.model';
import { ApiService } from '@app/services/api-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource<inputList>([]);
  inputListOptions: inputList[] = [];
  displayedColumns: string[] = ['id', 'date', 'matrixA', 'matrixB', 'status'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public apiService: ApiService,
  ){
    this.dataSource = new MatTableDataSource<inputList>([]);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.inputListOptions);
    this.loadinputListOptions();
  }

  loadinputListOptions(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['userId'];
      if (!isNaN(userId)) {
        this.apiService
          .getListInputOptions()
          .subscribe((info) => {
            if (info) {
              this.inputListOptions = info;
              this.dataSource.data = this.inputListOptions;
            }
          });
      }
    });
  }

  redirectBack(): void {
    this.router.navigate(['']);
  }

  redirectCreate(): void {
    this.router.navigate(['input/create']);
  }
}
