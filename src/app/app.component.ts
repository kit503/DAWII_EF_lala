import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReservaComponent } from './components/reserva/reserva.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReservaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto Divertec';
}
