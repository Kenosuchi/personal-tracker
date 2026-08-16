import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-insights-page',
  imports: [],
  templateUrl: './insights-page.html',
  styleUrl: './insights-page.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsPage {}
