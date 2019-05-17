import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import MUIDataTable from 'mui-datatables';

export interface IMUIOptions {
  page: number;
  count: number;
  serverSide: boolean;
  rowsSelected: [];
  filterType: string;
  textLabels: any;
  pagination: boolean;
  selectableRows: string;
  isRowSelectable: (dataIndex: number) => number;
  resizableColumns: boolean;
  expandableRows: boolean;
  customToolbarSelect: (selectedRows, displayData, setSelectedRows) => void;
  customFooter: (count, page, rowsPerPage, changePage) => string;
  customSort: (data: any[], colIndex: number, order: string) => any[];
  customSearch: (searchQuery: string, currentRow: any[], columns: any[]) => boolean;
  elevation: number;
  caseSensitive: boolean;
  responsive: string;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  rowHover: boolean;
  fixedHeader: boolean;
  sortFilterList: boolean;
  sort: boolean;
  filter: boolean;
  search: boolean;
  searchText: string;
  print: boolean;
  download: boolean;
  downloadOptions: any;
  onDownload: (buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string;
  viewColumns: boolean;
  onRowsSelect: (currentRowsSelected: any[], allRowsSelected: any[]) => void;
  onRowsDelete: (rowsDeleted: { lookup: { dataindex: boolean }, data: { index, dataIndex }[] }) => void | false;
  onCellClick: (colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void;
  onChangePage: (currentPage: number) => void;
  onChangeRowsPerPage: (numberOfRows: number) => void;
  onSearchChange: (searchText: string) => void;
  onSearchOpen: () => void;
  onFilterChange: (changedColumn: string, filterList: any[]) => void;
  onColumnSortChange: (changedColumn: string, direction: string) => void;
  onColumnViewChange: (changedColumn: string, action: string) => void;
  onTableChange: (action: string, tableState: any) => void;
  setRowProps: (row: any[], dataIndex: number) => any;
}

export interface IMUIDatatableProps {
  title: string[];
  columns: any[];
  data: any[];
  options: IMUIOptions;
}

@Component({
  selector: 'ngx-mui-datatable',
  template: '<span [id]="rootDomID"></span>',
  styles: []
})
export class MuiDatatablesComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() title: string[];
  @Input() columns: any[];
  @Input() data: any[];
  @Input() options: IMUIOptions;


  rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    return node;
  }

  protected getProps(): IMUIDatatableProps {
    const {
      title,
      columns,
      data,
      options
    } = this;
    return {
      title,
      columns,
      data,
      options
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(MUIDataTable, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}