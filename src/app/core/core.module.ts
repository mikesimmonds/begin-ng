import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptor } from './headers.interceptor';
import { BeginToastrModule } from '../shared/overlays/begin-toastr/begin-toastr.module';
import { BrowserModule } from '@angular/platform-browser';
import { OverlaysModule } from '../shared/overlays/overlays.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OverlaysModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OverlaysModule,
  ],
})
export class CoreModule {}
