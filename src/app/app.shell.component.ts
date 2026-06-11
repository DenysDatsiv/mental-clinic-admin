import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SupportFabComponent } from './shared/components/support-fab/support-fab.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, SupportFabComponent],
  template: `
    <div class="shell">
      <app-sidebar />
      <div class="shell-body">
        <app-topbar />
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
  `],
})
export class AppShellComponent {}
