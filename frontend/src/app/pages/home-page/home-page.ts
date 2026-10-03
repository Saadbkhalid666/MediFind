import { Component } from '@angular/core';
import { Topbar } from '../../sections/topbar/topbar';
import { Navbar } from '../../sections/navbar/navbar';
import { Hero } from '../../sections/hero/hero';
import { Trustbar } from '../../sections/trustbar/trustbar';

@Component({
  selector: 'app-home-page',
  imports: [Topbar, Navbar, Hero, Trustbar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
