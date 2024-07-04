import { Routes } from '@angular/router';
import { ReservaComponent } from './components/reserva/reserva.component';

export const routes: Routes = [
    {
        path: 'reservas',
        title: 'Reservas de DiverTec',
        component: ReservaComponent
    }
];
