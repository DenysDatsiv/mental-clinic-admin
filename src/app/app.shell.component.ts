import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SupportFabComponent } from './shared/components/support-fab/support-fab.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, SupportFabComponent],
  template: `
    <div class="shell" [class.sidebar-open]="sidebarOpen()">
      <app-sidebar [open]="sidebarOpen()" (closeRequest)="sidebarOpen.set(false)" />
      <div class="shell-overlay" (click)="sidebarOpen.set(false)"></div>
      <div class="shell-body">
        <app-topbar (toggleSidebar)="sidebarOpen.set(!sidebarOpen())" />
        <main class="shell-content">
          <router-outlet />
        </main>
      </div>
    </div>
    <app-support-fab />
  `,
  styles: [`
    .shell { display: flex; align-items: flex-start; }
    .shell-body { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 100vh; background: #f2f3f3; }
    .shell-content { flex: 1; }

    .shell-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      z-index: 150;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s;
    }

    @media (max-width: 768px) {
      .shell-overlay { display: block; }
      .shell.sidebar-open .shell-overlay { opacity: 1; pointer-events: all; }
    }
  `],
})
export class AppShellComponent {
  sidebarOpen = signal(false);
}
