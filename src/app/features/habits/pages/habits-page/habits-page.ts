import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-habits-page',
  imports: [],
  templateUrl: './habits-page.html',
  styleUrl: './habits-page.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitsPage {}
