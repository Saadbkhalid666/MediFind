import { Component } from '@angular/core';
import { Topbar } from '../../sections/topbar/topbar';
import { Navbar } from '../../sections/navbar/navbar';
import { Hero } from '../../sections/hero/hero';

@Component({
  selector: 'app-home-page',
  imports: [Topbar, Navbar, Hero],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
