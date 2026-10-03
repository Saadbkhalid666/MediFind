import { Component } from '@angular/core';
import {
  LucideAngularModule,
  LucidePill,
  LucideBottleWine,
  LucideStethoscope,
  LucideDroplet,
  LucideEye,
  LucideBriefcaseMedical,
  LucideBaby,
  LucideDumbbell
} from 'lucide-angular';
@Component({
  selector: 'app-popular-category',
  imports: [LucideAngularModule],
  templateUrl: './popular-category.html',
  styleUrl: './popular-category.css',
})
export class PopularCategory {
  protected readonly Pill = LucidePill;
protected readonly Bottle = LucideBottleWine;
protected readonly Stethoscope = LucideStethoscope;
protected readonly Droplet = LucideDroplet;
protected readonly Eye = LucideEye;
protected readonly BriefcaseMedical = LucideBriefcaseMedical;
protected readonly Baby = LucideBaby;
protected readonly Dumbbell = LucideDumbbell;
}
 