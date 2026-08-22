import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPage } from './tasks-page';
import { TaskStore } from '../../state/task-store';
import { computed, signal, WritableSignal } from '@angular/core';
import { Task } from '../../models/task';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let tasksState: WritableSignal<readonly Task[]>;
  let isLoadingState: WritableSignal<boolean>;
  let errorState: WritableSignal<string | null>;
  let taskStoreMock: Pick<TaskStore, 'tasks' | 'isLoading' | 'error' | 'taskCount' | 'load'>;

  const taskFixture: Task = {
    id: '1',
    title: 'Plan weekly meals',
    description: 'Choose meals and make a grocery list.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-08-24',
    category: 'Personal',
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-08-20T10:00:00Z',
    completedAt: null,
  };

  beforeEach(async () => {
    tasksState = signal<readonly Task[]>([]);
    isLoadingState = signal(false);
    errorState = signal<string | null>(null);

    taskStoreMock = {
      tasks: tasksState.asReadonly(),
      isLoading: isLoadingState.asReadonly(),
      error: errorState.asReadonly(),
      taskCount: computed(() => tasksState().length),
      load: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [
        {
          provide: TaskStore,
          useValue: taskStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load tasks when initialized', () => {
    expect(taskStoreMock.load).toHaveBeenCalledTimes(1);
  });

  it('shows a loading message while tasks load', () => {
    isLoadingState.set(true);
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('[role="status"]');
    expect(status?.textContent).toContain('Loading tasks');
  });

  it('renders task title when tasks are available', () => {
    tasksState.set([taskFixture]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Plan weekly meals');
  });

  it('shows an empty message when no tasks are available', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No tasks yet.');
  });

  it('shows an error and retries loading tasks', () => {
    errorState.set('Unable to load tasks. Please try again.');
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    const retryButton = fixture.nativeElement.querySelector('button');

    expect(alert?.textContent).toContain('Unable to load tasks. Please try again.');

    retryButton?.click();

    expect(taskStoreMock.load).toHaveBeenCalledTimes(2);
  });
});
