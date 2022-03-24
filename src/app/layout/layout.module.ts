import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FullpageLayoutComponent } from './fullpage-layout/fullpage-layout.component';
import { MainMenuComponent } from './top-nav/main-menu/main-menu.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

@NgModule({
  declarations: [
    TopNavComponent,
    BottomNavComponent,
    SidebarComponent,
    FullpageLayoutComponent,
    MainMenuComponent,
    AppLayoutComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [TopNavComponent, BottomNavComponent, AppLayoutComponent],
})
export class LayoutModule {}
