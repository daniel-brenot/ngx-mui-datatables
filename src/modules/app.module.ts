import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import { MuiDatatablesComponent } from '../components/ngx-mui-datatable/ngx-mui-datatable.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterDialogComponent } from 'src/components/dialogs/filter/filter-dialog.component';
import { ColumnsDialogComponent } from 'src/components/dialogs/columns/columns-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MuiDatatablesComponent,
    FilterDialogComponent,
    ColumnsDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  entryComponents: [
    FilterDialogComponent,
    ColumnsDialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
