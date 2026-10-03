import { Component } from '@angular/core';
import {
  LucideAngularModule,
  LucideSearch,
  LucideBadgeCheck,
  LucideRefreshCw,
  LucideMapPinned
} from 'lucide-angular';

@Component({
  selector: 'app-whyus',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './whyus.html',
  styleUrl: './whyus.css',
})
export class Whyus {
  protected readonly Search = LucideSearch;
  protected readonly BadgeCheck = LucideBadgeCheck;
  protected readonly RefreshCw = LucideRefreshCw;
  protected readonly MapPinned = LucideMapPinned;
}