import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, RouterModule, CoreModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
