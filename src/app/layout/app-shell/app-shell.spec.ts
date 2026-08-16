import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

describe('Application routing', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
    router = TestBed.inject(Router);
    harness = await RouterTestingHarness.create();
  });

  it('should redirect to the dashboard page by default', async () => {
    await harness.navigateByUrl('/');
    expect(router.url).toBe('/dashboard');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Dashboard');
  });

  it('should render the Tasks heading', async () => {
    await harness.navigateByUrl('/tasks');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Tasks');
  });

  it('should redirect to dashboard when unknown URL is accessed', async () => {
    await harness.navigateByUrl('/unknown');
    expect(router.url).toBe('/dashboard');
  });

  it('should contain all four navigation links', async () => {
    await harness.navigateByUrl('/dashboard');
    const links =
      harness.routeNativeElement?.querySelectorAll('nav[aria-label="Primary navigation"] a') ?? [];
    expect(links).toHaveLength(4);
    expect(Array.from(links, (link) => link.textContent?.trim())).toEqual([
      'Dashboard',
      'Tasks',
      'Habits',
      'Insights',
    ]);
  });
});
