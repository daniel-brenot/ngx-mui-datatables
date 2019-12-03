import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-search-dialog',
    templateUrl: 'search-dialog.component.html',
})
export class SearchDialogComponent {

    constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { title: string, filterFields: { type: '', presets: any[]}[]}) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}