import { Component } from '@angular/core';
import {
  LucideAngularModule,
  LucideCheck,
  LucideTimer,
  LucideMapPinCheckInside,
  LucideClock4
} from 'lucide-angular';

@Component({
  selector: 'app-trustbar',
  imports: [LucideAngularModule],
  templateUrl: './trustbar.html',
  styleUrl: './trustbar.css',
})
export class Trustbar {
  protected readonly Check = LucideCheck;
  protected readonly Timer = LucideTimer;
  protected readonly MapPin = LucideMapPinCheckInside;
  protected readonly Clock = LucideClock4;
}