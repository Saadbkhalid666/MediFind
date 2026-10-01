import { Component } from '@angular/core';
import { Topbar } from '../../sections/topbar/topbar';
import { Navbar } from '../../sections/navbar/navbar';

@Component({
  selector: 'app-home-page',
  imports: [Topbar, Navbar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
