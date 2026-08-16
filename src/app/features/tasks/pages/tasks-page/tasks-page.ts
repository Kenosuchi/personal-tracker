import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  imports: [],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {}
