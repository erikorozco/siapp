import { Component, OnInit, ElementRef, HostListener, AfterViewInit,
  ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { filter } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit, AfterViewInit {
  @Input() tableProperties: any;
  @Output() actionsHandler = new EventEmitter();
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: any = [];
  headElements = [];
  maxVisibleItems = 8;

  searchText: string;
  previous: any;
  tableActions: any = {};
  orderedElements: any = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.maxVisibleItems = this.tableProperties[0].maxVisibleItems;
    this.elements = this.tableProperties[0].filterFunction(this.tableProperties[0].datasource, '');
    this.headElements = this.tableProperties[0].headElements;
    this.tableActions = this.tableProperties[0].tableActions;

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    // console.log(prev)

    // const convertToString = (iterable) => {
    //   const values = Object.keys(iterable).map(property => {
    //     const value = iterable[property];
    //     if (typeof value === 'object' && !!value) {
    //       return  convertToString(value);
    //     } else {
    //       return value;
    //     }
    //   });
    //   return values;
    // };

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      // console.log(this.tableProperties[0].filterFunction);
      this.elements = this.tableProperties[0].filterFunction(prev, this.searchText);
      // this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      // this.elements = this.previous.filter(
      //   element => {
      //       // const values = convertToString(element);
      //     //  return JSON.stringify(element).toLowerCase().includes(this.searchText.toLowerCase());
      //       // return values.join('/').toLowerCase().includes(this.searchText.toLowerCase());
      //     return (element.therapist.speciality.toLowerCase().includes(this.searchText.toLowerCase())
      //         || element.therapist.name.toLowerCase().includes(this.searchText.toLowerCase())
      //         || element.therapist.last_name.toLowerCase().includes(this.searchText.toLowerCase())
      //         || element.therapist.second_last_name.toLowerCase().includes(this.searchText.toLowerCase())
      //         );
      //   }
      // );
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  action = (item, action) => {
    this.actionsHandler.emit({
      value: item,
      action
    });
  }

}
