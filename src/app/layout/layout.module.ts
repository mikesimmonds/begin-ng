import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, TopNavComponent, BottomNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopNavComponent, BottomNavComponent],
})
export class LayoutModule {}
