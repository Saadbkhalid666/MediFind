import { Component } from '@angular/core';
import { Topbar } from '../../sections/topbar/topbar';

@Component({
  selector: 'app-home-page',
  imports: [Topbar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
