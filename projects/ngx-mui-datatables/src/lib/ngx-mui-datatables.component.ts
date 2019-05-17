import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import MUIDataTable from 'mui-datatables';

export interface IMUIOptions {
  /** User provided starting page for pagination */
  page: number;
  /** User provided override for total number of rows */
  count: number;
  /** Enable remote data source */
  serverSide: boolean;
  /** User provided selected rows */
  rowsSelected: [];
  /** Choice of filtering view. enum('checkbox', 'dropdown', 'multiselect', 'textField') */
  filterType: string;
  /** User provided labels to localize text */
  textLabels: any;
  /** Enable/disable pagination */
  pagination: boolean;
  /** Numbers of rows that can be selected. Options are "multiple", "single", "none". */
  selectableRows: string;
  /** Enable/disable selection on certain rows with custom function. Returns true if not provided. function(dataIndex) => bool */
  isRowSelectable: (dataIndex: number) => number;
  /** Enable/disable resizable columns */
  resizableColumns: boolean;
  /** Enable/disable expandable rows */
  expandableRows: boolean;
  /** Render a custom selected rows toolbar. function(selectedRows, displayData, setSelectedRows) => void */
  customToolbarSelect: (selectedRows, displayData, setSelectedRows) => void;
  /** Render a custom table footer. function(count, page, rowsPerPage, changeRowsPerPage, changePage) => string */
  customFooter: (count, page, rowsPerPage, changePage) => string;
  /** Override default sorting with custom function. function(data: array, colIndex: number, order: string) => array */
  customSort: (data: any[], colIndex: number, order: string) => any[];
  /** Override default search with custom function. customSearch(searchQuery: string, currentRow: array, columns: array) => boolean */
  customSearch: (searchQuery: string, currentRow: any[], columns: any[]) => boolean;
  /** Shadow depth applied to Paper component */
  elevation: number;
  /** Enable/disable case sensitivity for search */
  caseSensitive: boolean;
  /** Enable/disable responsive table views. Options: 'stacked', 'scroll' */
  responsive: string;
  /** Number of rows allowed per page */
  rowsPerPage: number;
  /** Options to provide in pagination for number of rows a user can select */
  rowsPerPageOptions: number[];
  /** Enable/disable hover style over rows */
  rowHover: boolean;
  /** 	Enable/disable fixed header columns */
  fixedHeader: boolean;
  /** Enable/disable alphanumeric sorting of filter lists */
  sortFilterList: boolean;
  /** Enable/disable sort on all columns */
  sort: boolean;
  /** Show/hide filter icon from toolbar */
  filter: boolean;
  /** Show/hide search icon from toolbar */
  search: boolean;
  /** Initial search text */
  searchText: string;
  /** Show/hide print	icon from toolbar */
  print: boolean;
  /** Show/hide download icon from toolbar */
  download: boolean;
  /** Options to change the output of the CSV file. Default options: {filename: 'tableDownload.csv', separator: ','} */
  downloadOptions: any;
  /** A callback function that triggers when the user downloads the CSV file. In the callback, you can control what is written to the CSV file. function(buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string */
  onDownload: (buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string;
  /** Show/hide viewColumns icon from toolbar */
  viewColumns: boolean;
  /** Callback function that triggers when row(s) are selected. function(currentRowsSelected: array, allRowsSelected: array) => void */
  onRowsSelect: (currentRowsSelected: any[], allRowsSelected: any[]) => void;
  /** Callback function that triggers when row(s) are deleted. function(rowsDeleted: object(lookup: {dataindex: boolean}, data: arrayOfObjects: {index, dataIndex})) => void OR false (Returning false prevents row deletion.) */
  onRowsDelete: (rowsDeleted: { lookup: { dataindex: boolean }, data: { index, dataIndex }[] }) => void | false;
  /** Callback function that triggers when a row is clicked. function(rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => void */
  onCellClick: (colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void;
  /** Callback function that triggers when a cell is clicked. function(colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void */
  onChangePage: (currentPage: number) => void;
  /** Callback function that triggers when a page has changed. function(currentPage: number) => void */
  onChangeRowsPerPage: (numberOfRows: number) => void;
  /** Callback function that triggers when the search text value has changed. function(searchText: string) => void */
  onSearchChange: (searchText: string) => void;
  /** Callback function that triggers when the searchbox opens. function() => void */
  onSearchOpen: () => void;
  /** Callback function that triggers when filters have changed. function(changedColumn: string, filterList: array) => void */
  onFilterChange: (changedColumn: string, filterList: any[]) => void;
  /** Callback function that triggers when a column has been sorted. function(changedColumn: string, direction: string) => void */
  onColumnSortChange: (changedColumn: string, direction: string) => void;
  /** Callback function that triggers when a column view has been changed. function(changedColumn: string, action: string) => void */
  onColumnViewChange: (changedColumn: string, action: string) => void;
  /** Callback function that triggers when table state has changed. function(action: string, tableState: object) => void */
  onTableChange: (action: string, tableState: any) => void;
  /** Is called for each row and allows to return custom props for this row based on its data. function(row: array, dataIndex: number) => object */
  setRowProps: (row: any[], dataIndex: number) => any;
}

export interface IMUIDatatableProps {
  /** Title used to caption table */
  title: string[];
  /** Columns used to describe table. Must be either an array of simple strings or objects describing a column */
  columns: any[];
  /** Data used to describe table. Must be an array containing objects. (Arrays containing just strings or numbers also supported) */
  data: any[];
  /** Options used to describe table */
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