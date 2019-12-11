import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-filter-dialog',
    templateUrl: 'filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

    constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { title: string, filterFields: { type: '', presets: any[]}[]}) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}