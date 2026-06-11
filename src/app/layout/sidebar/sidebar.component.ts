import { Component, EventEmitter, HostBinding, inject, Input, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[]; // if set, only these roles can see the item
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="logo.avif" alt="Логотип" class="sidebar-logo-img" />
        <div class="sidebar-logo-text">
          <span class="sidebar-logo-title">Онлайн центр ментального здоров'я</span>
          <span class="sidebar-logo-sub">Євгена Скрипника</span>
        </div>
      </div>
      <nav>
        @for (item of items; track item.route) {
          <a [routerLink]="item.route" routerLinkActive="active" class="nav-item"
             (click)="closeRequest.emit()">
            <i [class]="'pi ' + item.icon"></i>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" (click)="showLogout.set(true)">
          <i class="pi pi-sign-out"></i>
          <span>Вийти</span>
        </button>
      </div>
    </aside>

    @if (showLogout()) {
      <div class="modal-overlay" (click)="showLogout.set(false)">
        <div class="modal-card" (click)="$event.stopPropagation()">
          <div class="modal-icon-wrap">
            <i class="pi pi-sign-out"></i>
          </div>
          <h3 class="modal-title">Вийти з системи?</h3>
          <p class="modal-desc">Ваша сесія буде завершена. Щоб продовжити роботу, потрібно буде увійти знову.</p>
          <div class="modal-actions">
            <button class="modal-btn modal-btn-cancel" (click)="showLogout.set(false)">Скасувати</button>
            <button class="modal-btn modal-btn-confirm" (click)="doLogout()">
              <i class="pi pi-sign-out"></i> Вийти
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() open = false;
  @Output() closeRequest = new EventEmitter<void>();
  @HostBinding('class.is-open') get isOpen() { return this.open; }

  private auth = inject(AuthService);
  showLogout   = signal(false);

  private allItems: NavItem[] = [
    { label: 'Панель',      icon: 'pi-home',      route: '/dashboard' },
    { label: 'Статті',      icon: 'pi-file-edit', route: '/articles' },
    { label: 'Тести',       icon: 'pi-clipboard', route: '/tests' },
    { label: 'Команда',     icon: 'pi-id-card',   route: '/team',  roles: ['admin'] },
    { label: 'Відгуки',     icon: 'pi-star',      route: '/reviews' },
    { label: 'Договір',     icon: 'pi-file-edit', route: '/contract', roles: ['admin'] },
    { label: 'Користувачі', icon: 'pi-users',     route: '/users', roles: ['admin'] },
  ];

  get items(): NavItem[] {
    const role = this.auth.currentUser()?.role;
    return this.allItems.filter(item => !item.roles || item.roles.includes(role ?? ''));
  }

  doLogout() {
    this.showLogout.set(false);
    this.auth.logout();
  }
}
