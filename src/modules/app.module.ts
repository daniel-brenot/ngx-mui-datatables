import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import { MuiDatatablesComponent } from '../components/ngx-mui-datatable/ngx-mui-datatable.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SearchDialogComponent } from 'src/components/dialogs/search/search-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MuiDatatablesComponent,
    SearchDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  entryComponents: [
    SearchDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
