import { firstValueFrom } from 'rxjs';
import { TaskApi } from './task-api';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CreateTaskRequest, Task, UpdateTaskRequest } from '../models/task';

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
];

const createTaskRequestFixture: CreateTaskRequest = {
  title: 'New Task',
  description: 'New Task Description',
  priority: 'low',
  dueDate: null,
  category: null,
};

const updateTaskRequestFixture = {
  title: 'Updated Task Title',
  description: 'Updated Task Description',
  status: 'completed',
  priority: 'high',
  dueDate: '2024-06-01',
  category: 'Personal',
} satisfies UpdateTaskRequest;

const createdTaskFixture: Task = {
  ...createTaskRequestFixture,
  id: '3',
  status: 'todo',
  createdAt: '2024-06-03T12:00:00Z',
  updatedAt: '2024-06-03T12:00:00Z',
  completedAt: null,
};

const updatedTaskFixture: Task = {
  ...updateTaskRequestFixture,
  id: '1',
  createdAt: '2024-06-01T10:00:00Z',
  updatedAt: '2024-06-04T12:00:00Z',
  completedAt: '2024-06-04T12:00:00Z',
};

describe('TaskApi', () => {
  let api: TaskApi;
  let httpTesting: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskApi, provideHttpClientTesting()],
    });
    api = TestBed.inject(TaskApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should get tasks', async () => {
    const resultPromise = firstValueFrom(api.getTasks());
    const request = httpTesting.expectOne({
      method: 'GET',
      url: '/api/tasks',
    });
    request.flush(tasksFixture);
    expect(await resultPromise).toEqual(tasksFixture);
  });

  it('should get a task by id', async () => {
    const taskId = '1';
    const resultPromise = firstValueFrom(api.getTask(taskId));
    const request = httpTesting.expectOne({
      method: 'GET',
      url: `/api/tasks/${taskId}`,
    });
    request.flush(tasksFixture[0]);
    expect(await resultPromise).toEqual(tasksFixture[0]);
  });

  it('should create a task', async () => {
    const resultPromise = firstValueFrom(api.createTask(createTaskRequestFixture));
    const request = httpTesting.expectOne({
      method: 'POST',
      url: '/api/tasks',
    });
    request.flush(createdTaskFixture);
    expect(request.request.body).toEqual(createTaskRequestFixture);
    expect(await resultPromise).toEqual(createdTaskFixture);
  });

  it('should update a task', async () => {
    const taskId = '1';
    const resultPromise = firstValueFrom(api.updateTask(taskId, updateTaskRequestFixture));
    const request = httpTesting.expectOne({
      method: 'PATCH',
      url: `/api/tasks/${taskId}`,
    });
    request.flush(updatedTaskFixture);
    expect(request.request.body).toEqual(updateTaskRequestFixture);
    expect(await resultPromise).toEqual(updatedTaskFixture);
  });

  it('should delete a task', async () => {
    const taskId = '1';
    const resultPromise = firstValueFrom(api.deleteTask(taskId));
    const request = httpTesting.expectOne({
      method: 'DELETE',
      url: `/api/tasks/${taskId}`,
    });
    request.flush(null);
    expect(await resultPromise).toBeNull();
  });
});
