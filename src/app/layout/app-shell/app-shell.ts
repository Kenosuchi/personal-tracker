import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  protected readonly navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Tasks',
      path: '/tasks',
    },
    {
      label: 'Habits',
      path: '/habits',
    },
    {
      label: 'Insights',
      path: '/insights',
    },
  ] as const;
}
