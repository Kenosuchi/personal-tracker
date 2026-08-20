import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task';
import { TaskApi } from '../data-access/task-api';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private readonly _tasks = signal<readonly Task[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly tasks = this._tasks.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly taskCount = computed(() => this._tasks().length);
  readonly completedTaskCount = computed(
    () => this._tasks().filter((task) => task.status === 'completed').length,
  );
  readonly openTaskCount = computed(
    () => this._tasks().filter((task) => task.status !== 'completed').length,
  );

  private readonly _taskApi = inject(TaskApi);
  private readonly LOAD_TASKS_FAILED_MESSAGE = 'Unable to load tasks. Please try again.';

  load(): void {
    this._isLoading.set(true);
    this._error.set(null);
    this._taskApi
      .getTasks()
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
        error: () => {
          this._error.set(this.LOAD_TASKS_FAILED_MESSAGE);
        },
      });
  }
}
