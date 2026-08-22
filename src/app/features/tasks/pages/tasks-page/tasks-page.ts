import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskPriority, TaskStatus } from '../../models/task';
import { TaskStore } from '../../state/task-store';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tasks-page',
  imports: [MatButtonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit {
  readonly taskStore = inject(TaskStore);

  ngOnInit(): void {
    this.taskStore.load();
  }

  onRetry() {
    this.taskStore.load();
  }

  getStatusClasses(status: TaskStatus): string {
    switch (status) {
      case 'todo':
        return 'text-gray-700';
      case 'in-progress':
        return 'text-blue-700';
      case 'completed':
        return 'text-green-700';
    }
  }

  getPriorityClasses(priority: TaskPriority): string {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'high':
        return 'bg-red-100 text-red-700';
    }
  }
}
