import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './pages/register/register';
import { HomePage } from './pages/home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('medifind');
}
