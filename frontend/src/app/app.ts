import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './sections/navbar/navbar';
import { Topbar } from './sections/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('medifind');
}
