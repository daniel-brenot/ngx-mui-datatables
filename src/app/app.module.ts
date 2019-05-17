import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMuiDatatablesModule } from 'ngx-mui-datatables';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMuiDatatablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
