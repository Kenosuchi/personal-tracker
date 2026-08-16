import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'Dashboard | Personal Tracker',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page').then(
            (m) => m.DashboardPage,
          ),
      },
      {
        path: 'tasks',
        title: 'Tasks | Personal Tracker',
        loadComponent: () =>
          import('./features/tasks/pages/tasks-page/tasks-page').then((m) => m.TasksPage),
      },
      {
        path: 'habits',
        title: 'Habits | Personal Tracker',
        loadComponent: () =>
          import('./features/habits/pages/habits-page/habits-page').then((m) => m.HabitsPage),
      },
      {
        path: 'insights',
        title: 'Insights | Personal Tracker',
        loadComponent: () =>
          import('./features/insights/pages/insights-page/insights-page').then(
            (m) => m.InsightsPage,
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
