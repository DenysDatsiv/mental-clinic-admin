import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

type Step = 'closed' | 'form' | 'success';

@Component({
  selector: 'app-support-fab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-fab.component.html',
  styleUrl: './support-fab.component.scss',
})
export class SupportFabComponent {
  private http = inject(HttpClient);

  step    = signal<Step>('closed');
  sending = signal(false);
  error   = signal('');
  message = '';

  toggle() {
    this.step.update(s => s === 'closed' ? 'form' : 'closed');
    this.error.set('');
  }

  close() { this.step.set('closed'); }

  send() {
    if (!this.message.trim()) {
      this.error.set('Введіть повідомлення.');
      return;
    }
    this.sending.set(true);
    this.error.set('');

    this.http.post(`${environment.apiUrl}/support/message`, {
      name:    'Admin Panel',
      message: this.message.trim(),
    }).subscribe({
      next: () => {
        this.sending.set(false);
        this.step.set('success');
        this.message = '';
      },
      error: () => {
        this.sending.set(false);
        this.error.set('Помилка надсилання. Спробуйте пізніше.');
      },
    });
  }

  again() {
    this.step.set('form');
  }
}
