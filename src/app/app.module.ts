import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, RouterModule, CoreModule, LayoutModule, DashboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
