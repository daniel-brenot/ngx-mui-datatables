import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IColumn } from 'src/components/ngx-mui-datatable/ngx-mui-datatable.component';

@Component({
    selector: 'app-columns-dialog',
    templateUrl: 'columns-dialog.component.html',
    styleUrls: ['./columns-dialog.component.scss']
})
export class ColumnsDialogComponent {

    constructor(private dialogRef: MatDialogRef<ColumnsDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: { title: string, columns: IColumn[]}) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}