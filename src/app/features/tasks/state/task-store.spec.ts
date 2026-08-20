import { Subject } from 'rxjs';
import { TaskApi } from '../data-access/task-api';
import { Task } from '../models/task';
import { TaskStore } from './task-store';
import { TestBed } from '@angular/core/testing';

const tasksFixture: readonly Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'todo',
    priority: 'medium',
    dueDate: null,
    category: null,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    completedAt: null,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-06-10',
    category: 'Work',
    createdAt: '2024-06-01T11:00:00Z',
    updatedAt: '2024-06-01T11:00:00Z',
    completedAt: null,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-06-05',
    category: 'Personal',
    createdAt: '2024-06-01T12:00:00Z',
    updatedAt: '2024-06-01T12:00:00Z',
    completedAt: '2024-06-05T15:00:00Z',
  },
];

describe('TaskStore', () => {
  let store: TaskStore;
  let tasksResponse$: Subject<readonly Task[]>;
  let taskApiMock: Pick<TaskApi, 'getTasks'>;
  beforeEach(() => {
    tasksResponse$ = new Subject<readonly Task[]>();
    taskApiMock = {
      getTasks: () => tasksResponse$.asObservable(),
    };
    TestBed.configureTestingModule({
      providers: [
        TaskStore,
        {
          provide: TaskApi,
          useValue: taskApiMock,
        },
      ],
    });
    store = TestBed.inject(TaskStore);
  });

  it('initial state should have default values', () => {
    expect(store.tasks()).toEqual([]);
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.taskCount()).toBe(0);
    expect(store.completedTaskCount()).toBe(0);
    expect(store.openTaskCount()).toBe(0);
  });

  it('should load tasks successfully', () => {
    store.load();
    expect(store.isLoading()).toBe(true);
    tasksResponse$.next(tasksFixture);
    tasksResponse$.complete();
    expect(store.tasks()).toEqual(tasksFixture);
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.taskCount()).toBe(3);
    expect(store.completedTaskCount()).toBe(1);
    expect(store.openTaskCount()).toBe(2);
  });

  it('should set an error when task loading fails', () => {
    store.load();
    tasksResponse$.error(new Error('Network error'));
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBe('Unable to load tasks. Please try again.');
    expect(store.tasks()).toEqual([]);
  });

  it('should preserve existing tasks if error occurs', () => {
    store.load();
    expect(store.isLoading()).toBe(true);
    tasksResponse$.next(tasksFixture);
    tasksResponse$.complete();
    expect(store.isLoading()).toBe(false);
    expect(store.tasks()).toEqual(tasksFixture);

    tasksResponse$ = new Subject<readonly Task[]>();

    store.load();
    expect(store.isLoading()).toBe(true);
    tasksResponse$.error(new Error('Network error'));
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBe('Unable to load tasks. Please try again.');
    expect(store.tasks()).toEqual(tasksFixture);
    expect(store.taskCount()).toBe(3);
    expect(store.completedTaskCount()).toBe(1);
    expect(store.openTaskCount()).toBe(2);
  });

  it('should clear a prior error when retrying task loading', () => {
    store.load();
    expect(store.isLoading()).toBe(true);
    tasksResponse$.error(new Error('Network error'));
    expect(store.error()).toBe('Unable to load tasks. Please try again.');
    expect(store.isLoading()).toBe(false);
    expect(store.tasks()).toEqual([]);

    tasksResponse$ = new Subject<readonly Task[]>();

    store.load();
    expect(store.isLoading()).toBe(true);
    expect(store.error()).toBeNull();
    tasksResponse$.next(tasksFixture);
    tasksResponse$.complete();
    expect(store.isLoading()).toBe(false);
    expect(store.tasks()).toEqual(tasksFixture);
    expect(store.taskCount()).toBe(3);
    expect(store.completedTaskCount()).toBe(1);
    expect(store.openTaskCount()).toBe(2);
  });
});
