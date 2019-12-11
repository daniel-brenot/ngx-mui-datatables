import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { FilterDialogComponent } from '../dialogs/filter/filter-dialog.component';
import { getFilter, getPrintableHTML, printHtml } from './utils';
import { ColumnsDialogComponent } from '../dialogs/columns/columns-dialog.component';

export interface IMUIDTOptions {
    /** User provided starting page for pagination */
    page?: number;
    /** User provided override for total number of rows */
    count?: number;
    /** Enable remote data source */
    serverSide?: boolean;
    /** User provided selected rows */
    rowsSelected?: [];
    /** Choice of filtering view. enum('checkbox', 'dropdown', 'multiselect', 'textField') */
    filterType?: string;
    /** User provided labels to localize text */
    textLabels?: ITextLabels;
    /** Enable/disable pagination */
    pagination?: boolean;
    /** Numbers of rows that can be selected. Options are 'multiple', 'single', 'none'. */
    selectableRows?: 'multiple' | 'single' | 'none';
    /** Enable/disable select toggle when row is clicked. When False, only checkbox will trigger this action. */
    selectableRowsOnClick?: boolean;
    /** Enable/disable selection on certain rows with custom function. Returns true if not provided. function(dataIndex) => bool */
    isRowSelectable?: (dataIndex: number) => boolean;
    /** Enable/disable resizable columns */
    resizableColumns?: boolean;
    /** Enable/disable expandable rows */
    expandableRows?: boolean;
    /** Enable/disable expand trigger when row is clicked. When False, only expand icon will trigger this action. */
    expandableRowsOnClick?: boolean;
    /** Override default sorting with custom function. function(data: array, colIndex: number, order: string) => array */
    customSort?: (data: any[], colIndex: number, order: string) => any[];
    /** Override default search with custom function. customSearch(searchQuery: string, currentRow: array, columns: array) => boolean */
    customSearch?: (searchQuery: string, currentRow: any[], columns: any[]) => boolean;
    /** Shadow depth applied to Paper component */
    elevation?: number;
    /** Enable/disable case sensitivity for search */
    caseSensitive?: boolean;
    /** Enable/disable responsive table views. Options: 'stacked', 'scroll' */
    responsive?: string;
    /** Number of rows allowed per page */
    rowsPerPage?: number;
    /** Options to provide in pagination for number of rows a user can select */
    rowsPerPageOptions?: number[];
    /** Enable/disable hover style over rows */
    rowHover?: boolean;
    /** Enable/disable fixed header columns */
    fixedHeader?: boolean;
    /** Enable/disable alphanumeric sorting of filter lists */
    sortFilterList?: boolean;
    /** Enable/disable sort on all columns */
    sort?: boolean;
    /** Show/hide filter icon from toolbar */
    filter?: boolean;
    /** Show/hide search icon from toolbar */
    search?: boolean;
    /** Initial search text */
    searchText?: string;
    /** Show/hide print	icon from toolbar */
    print?: boolean;
    /** Show/hide download icon from toolbar */
    download?: boolean;
    /** Options to change the output of the CSV file. Default options: {filename: 'tableDownload.csv', separator: ','} */
    downloadOptions?: { filename: string, separator: string };
    /** A callback function that triggers when the user downloads the CSV file. In the callback, you can control what is written to the CSV file. function(buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string */
    onDownload?: (buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string | boolean;
    /** Show/hide viewColumns icon from toolbar */
    viewColumns?: boolean;
    /** Callback function that triggers when row(s) are selected. function(currentRowsSelected: array, allRowsSelected: array) => void */
    onRowsSelect?: (currentRowsSelected: any[], allRowsSelected: any[]) => void;
    /** Callback function that triggers when row(s) are deleted. function(rowsDeleted: object(lookup: {dataindex: boolean}, data: arrayOfObjects: {index, dataIndex})) => void OR false (Returning false prevents row deletion.) */
    onRowsDelete?: (rowsDeleted: { lookup: { dataindex: boolean }, data: { index, dataIndex }[] }) => void | false;
    /** Callback function that triggers when a row is clicked. function(rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => void */
    onRowClick?: (rowData: string, rowMeta: { dataIndex: number, rowIndex: number }) => void,
    /** Callback function that triggers when a cell is clicked. function(colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void */
    onCellClick?: (colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void;
    /** Callback function that triggers when a page has changed. function(currentPage: number) => void */
    onChangePage?: (currentPage: number) => void;
    /** Callback function that triggers when a page has changed.  */
    onChangeRowsPerPage?: (numberOfRows: number) => void;
    /** Callback function that triggers when the search text value has changed. function(searchText: string) => void */
    onSearchChange?: (searchText: string) => void;
    /** Callback function that triggers when the searchbox opens. function() => void */
    onSearchOpen?: () => void;
    /** Callback function that triggers when filters have changed. function(changedColumn: string, filterList: array) => void */
    onFilterChange?: (changedColumn: string, filterList: any[]) => void;
    /** Callback function that triggers when a column has been sorted. function(changedColumn: string, direction: string) => void */
    onColumnSortChange?: (changedColumn: string, direction: string) => void;
    /** Callback function that triggers when a column view has been changed. function(changedColumn: string, action: string) => void */
    onColumnViewChange?: (changedColumn: string, action: string) => void;
    /** Callback function that triggers when table state has changed. function(action: string, tableState: object) => void */
    onTableChange?: (action: string, tableState: any) => void;
}

export interface IColumn {
    /** Name of column (This field is required) */
    name: string;
    /** Column Header Name override */
    label: string;
    /** Options for customizing column */
    options: IColumnOptions;
}

export interface ITextLabels {
    body: {
        noMatch: string;
        toolTip: string;
    };
    pagination: {
        next: string;
        previous: string;
        rowsPerPage: string;
        displayRows: string;
    };
    toolbar: {
        search: string;
        downloadCsv: string;
        print: string;
        viewColumns: string;
        filterTable: string;
    };
    filter: {
        all: string;
        title: string;
        reset: string;
    };
    viewColumns: {
        title: string;
        titleAria: string;
    };
    selectedRows: {
        text: string;
        delete: string;
        deleteAria: string;
    };

}

export interface IColumnOptions {
    /** Display column in table */
    display: boolean;
    /** This denotes whether the column has data or not (for use with intentionally empty columns) */
    empty: boolean;
    /** Allow user to toggle column visibility through 'View Column' list */
    viewColumns: boolean;
    /** Filter value list */
    filterList?: boolean;
    /** With filter options, it's possible to use custom names for the filter fields */
    filterOptions?: any;
    /** Function that returns a string used as the chip label. */
    customFilterListRender?: (value) => string;
    /** Display column in filter list */
    filter: boolean;
    /** Choice of filtering view. Takes priority over global filterType option */
    filterType: 'checkbox' | 'dropdown' | 'multiselect' | 'textField' | 'custom';
    /** Enable/disable sorting on column */
    sort: boolean;
    /** Exclude/include column from search results */
    searchable: boolean;
    /** Set default sort order */
    sortDirection?: 'asc' | 'desc';
    /** Display column when printing */
    print: boolean;
    /** Display column in CSV download file */
    download: boolean;
    /** Display hint icon with string as tooltip on hover. */
    hint?: string;
}

export interface IMUIDatatableProps {
    /** Title used to caption table */
    title: string;
    /** Columns used to describe table. Must be either an array of simple strings or objects describing a column */
    columns: (string | IColumn)[];
    /** Data used to describe table. Must be an array containing objects. (Arrays containing just strings or numbers also supported) */
    data: any[];
    /** Options used to describe table */
    options: IMUIDTOptions;
}

@Component({
    selector: 'ngx-mui-datatable',
    templateUrl: './ngx-mui-datatable.component.html',
    styleUrls: ['./ngx-mui-datatable.component.scss']
})
export class MuiDatatablesComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, IMUIDatatableProps {

    constructor(private dialog: MatDialog){}

    @Input() title = '';
    @Input()
    set columns(value: (string | IColumn)[]) {
        this.columnsLocal = [];
        for (const i of value) {
            let temp: IColumn = {
                name: '',
                label: '',
                options: {
                    display: true,
                    empty: false,
                    viewColumns: false,
                    filter: true,
                    filterType: 'dropdown',
                    sort: true,
                    searchable: true,
                    print: true,
                    download: true
                }
            };
            if (typeof i === 'string') {
                temp.name = i;
                temp.label = i;
            } else if (typeof i === 'object') {
                temp = { ...temp, ...i, options: { ...temp.options, ...i.options } };
            }
            this.columnsLocal.push(temp);
        }
    }

    get columns(): (string | IColumn)[] {
        return this.columnsLocal;
    }
    @Input()
    set data(val: any[]) {
        this.dataLocal.data = [];
        for (const i of val) {
            if (Object.prototype.toString.call(i) === '[object Object]') {
                this.dataLocal.data.push(i);
            } else {
                // If in this scope, assume the variable i is a array
                const row = {};
                let k = 0;
                for (const j of this.displayedColumns) {
                    row[j] = i[k++];
                }
                this.dataLocal.data.push(row);
            }
        }
        if(!this.dataLocal.data){
            
            this.dataLocal.data;
        }
    }
    get data(): any[] {
        return this.dataLocal.data;
    }

    @Input() set options(val: IMUIDTOptions) {
        // TODO deep merge?
        this.optionsLocal = {
            serverSide: false,
            pagination: true,
            selectableRows: 'multiple',
            selectableRowsOnClick: false,
            isRowSelectable: (dataIndex: number) => true,
            expandableRows: false,
            expandableRowsOnClick: false,
            resizableColumns: false,
            customSort: (data: any[], colIndex: number, order: string) => { return []; },
            customSearch: (searchQuery: string, currentRow: [], columns: []) => true,
            elevation: 4,
            caseSensitive: false,
            responsive: 'stacked',
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 15, 20],
            rowHover: true,
            fixedHeader: true,
            sortFilterList: true,
            sort: true,
            filter: true,
            search: true,
            searchText: '',
            print: true,
            download: true,
            downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
            onDownload: (buildHead: (columns) => string, buildBody: (data) => string, columns, data) => true,
            viewColumns: true,
            onRowsSelect: () => { },
            onRowsDelete: () => { },
            onRowClick: () => { },
            onCellClick: () => { },
            onChangePage: () => { },
            onChangeRowsPerPage: () => { },
            onSearchChange: () => { },
            onSearchOpen: () => { },
            onColumnSortChange: () => { },
            onColumnViewChange: () => { },
            onTableChange: () => { },
            textLabels: {
                body: {
                    noMatch: 'Sorry, no matching records found',
                    toolTip: 'Sort',
                },
                pagination: {
                    next: 'Next Page',
                    previous: 'Previous Page',
                    rowsPerPage: 'Rows per page:',
                    displayRows: 'of',
                },
                toolbar: {
                    search: 'Search',
                    downloadCsv: 'Download CSV',
                    print: 'Print',
                    viewColumns: 'View Columns',
                    filterTable: 'Filter Table',
                },
                filter: {
                    all: 'All',
                    title: 'Filters',
                    reset: 'Reset',
                },
                viewColumns: {
                    title: 'Show Columns',
                    titleAria: 'Show/Hide Table Columns',
                },
                selectedRows: {
                    text: 'row(s) selected',
                    delete: 'Delete',
                    deleteAria: 'Delete Selected Rows',
                }
            },
            ...val
        };
    }

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false}) sort: MatSort;

    /** Local copy of columns in  format that can be read by the table */
    private columnsLocal: IColumn[] = [];

    /** Local copy of options with defaults filled in */
    private optionsLocal: IMUIDTOptions;

    /** Local copy of data */
    private dataLocal: MatTableDataSource<any> = new MatTableDataSource();

    /** If the component has the search bar, this  is true */
    private searching = false;

    /** Stores the filter options for each column
     * In the format: { <name>: { label: '<column label>', values: [<value for column>...] } }
     */
    private filterOptions: any

    /** Selection model for selecting rows in the table */
    initialSelection = [];
    allowMultiSelect = true;
    private selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

    /** Returns the columns that are to be displayed as a string array */
    private get displayedColumns(): string[] {
        const ret = [];
        for (const i of this.columnsLocal) {
            if (i.options.display) { ret.push(i.name); }
        }
        return ret;
    }

    /** Returns an array containing the columns to display as well as the select column for selecting rows */
    private get tableColumns(): string[] {
        const ret = this.displayedColumns;
        ret.unshift('select');
        return ret;
    }

    /** Builds the head string for the csv file */
    private buildCSVHead(columns: string[]): string {
        let header = '';
        for (const [i, v] of columns.entries()) {
            header += `"${v}"`;
            if(i!==this.columnsLocal.length-1) header += this.optionsLocal.downloadOptions.separator;
        }
        return header + '\n';
    }

    /** Builds the csv body  */
    private buildCSVBody(data: any[]): string {
        let body = '';
        for (const row of data) {
            for (const [i, v] of this.columnsLocal.entries()) {
                if (typeof row[v.name] === 'string') {
                    body += `"${row[v.name]}"`;
                } else if (typeof row[v.name] === 'number') {
                    body += `${row[v.name]}`;
                } else if (typeof row[v.name] === 'boolean') {
                    body += row[v.name] ? `"true"` : `"false"`;
                } else if (typeof row[v.name] === 'object' && Object.prototype.toString.call(row[v.name]) === '[object Date]') {
                    body += (row[v.name] as Date).toISOString();
                }
                if(i!==this.columnsLocal.length-1) body += this.optionsLocal.downloadOptions.separator;
            }
            body += '\n';
        }

        return body;
    }

    /**
     * Triggers a print of the data in the table
    **/
    print(){
        printHtml(getPrintableHTML(this.columnsLocal, this.dataLocal.data));
    }

    /**
     * Triggers when the user clicks the download csv button
    **/
    onDownload(){
        
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    private openFilter() {
        this.dialog.open(FilterDialogComponent, {
            height: '300px',
            width: '400px',
            data: {
                title: this.optionsLocal.textLabels.filter.title
            }
        });
    }

    private openColumns() {
        this.dialog.open(ColumnsDialogComponent, {
            height: '340px',
            width: '400px',
            data: {
                title: this.optionsLocal.textLabels.viewColumns.title,
                columns: this.columnsLocal
            }
        });
    }

    ngOnInit() {
        this.dataLocal.filterPredicate = getFilter(this.optionsLocal);
    }

    ngOnChanges() {
    }

    ngAfterViewInit() {
        this.dataLocal.paginator = this.paginator;
        this.dataLocal.sort = this.sort;
    }

    ngOnDestroy() {
    }

}