/** Includes the material modules used in the application */

import { MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule, MatListModule, MatTabsModule, MatNativeDateModule, MatProgressSpinnerModule, MatBottomSheetModule, MatSortModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatSelectModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatDialogModule,
        MatInputModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatExpansionModule, MatPaginatorModule,
        MatProgressSpinnerModule, MatBottomSheetModule, MatTooltipModule, MatFormFieldModule, MatSortModule],
    exports: [MatButtonModule, MatCheckboxModule, MatSelectModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatDialogModule,
        MatInputModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatExpansionModule, MatPaginatorModule,
        MatProgressSpinnerModule, MatBottomSheetModule, MatTooltipModule, MatFormFieldModule, MatSortModule]
})
export class MaterialModule { }
