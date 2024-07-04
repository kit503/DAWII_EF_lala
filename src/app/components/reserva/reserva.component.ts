import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { ClienteService } from '../../services/cliente.service';
import { EmpleadoService } from '../../services/empleado.service';
import { TarifaService } from '../../services/tarifa.service';
import { Reservas } from '../../interfaces/reservas.interface';
import { Clientes } from '../../interfaces/clientes.interface';
import { Empleado } from '../../interfaces/empleado.interface';
import { Tarifa } from '../../interfaces/tarifa.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})

export class ReservaComponent implements OnInit {
  reservas: Reservas[] = [];
  reserva: Reservas | null = null;

  selectedReserva: any; // To store the selected reservation for the modal

  today: string = new Date().toISOString().split('T')[0];

  newReserva: Reservas = {
    id: 0,
    cantidadAdultos: 0,
    cantidadNinos: 0,
    duracionReserva: '01:00:00', // 1 hora por defecto
    fecha: new Date(this.today),    
    horaFin: '00:00:00',
    horaInicio: '00:00:00',
    cliente: {} as Clientes,
    empleado: {} as Empleado,
    tarifas: []
  };

  updateReserva: Reservas | null = null;
  clientes: Clientes[] = [];
  empleados: Empleado[] = [];
  tarifas: Tarifa[] = [];
  availableTarifas: Tarifa[] = [];
  availableDurations: string[] = ['01:00:00', '02:00:00', '03:00:00', '04:00:00'];

  constructor(
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private empleadoService: EmpleadoService,
    private tarifaService: TarifaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllReservasAPI();
    this.getAllClientes();
    this.getAllEmpleados();
    this.getAllTarifas();
    this.loadAvailableTarifas();
  }

  // Method to open modal and set selected reservation
  openModal(reserva: any) {
    this.selectedReserva = reserva;
    this.modalService.open('detalleReservaModal', { centered: true });
  }


/*   validateDate(): void {
    const selectedDate = new Date(this.newReserva.fecha);
    const todayDate = new Date(this.today);
  
    if (selectedDate.getTime() !== todayDate.getTime()) {
      this.newReserva.fecha = todayDate;
    }
  } */

  validateDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value !== this.today) {
      input.value = this.today;
    }
  }
  


  

  loadAvailableTarifas(): void {
    this.tarifaService.getAllTarifas().subscribe({
      next: (tarifas: Tarifa[]) => {
        this.availableTarifas = tarifas;
      },
      error: (error) => console.error('Error loading tarifas:', error)
    });
  }

  onTarifaChange(tarifa: Tarifa, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.newReserva.tarifas.push(tarifa);
    } else {
      this.newReserva.tarifas = this.newReserva.tarifas.filter(t => t.id !== tarifa.id);
    }
  }

  getAllReservasAPI(): void {
    this.reservaService.getAllReservas().subscribe({
      next: (response: Reservas[]) => this.reservas = response,
      error: (error) => console.error(error)
    });
  }

  getAllClientes(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (response: Clientes[]) => this.clientes = response,
      error: (error) => console.error('Error fetching clientes:', error)
    });
  }

  getAllEmpleados(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (response: Empleado[]) => this.empleados = response,
      error: (error) => console.error('Error fetching empleados:', error)
    });
  }

  getAllTarifas(): void {
    this.tarifaService.getAllTarifas().subscribe({
      next: (response: Tarifa[]) => this.tarifas = response,
      error: (error) => console.error('Error fetching tarifas:', error)
    });
  }

  getReservaById(id: number): void {
    this.reservaService.getReservaById(id).subscribe({
      next: (response: Reservas) => this.reserva = response,
      error: (error) => console.error('Error fetching reserva:', error)
    });
  }

  createReserva(): void {
    this.reservaService.createReserva(this.newReserva).subscribe({
      next: (response: Reservas) => {
        this.reservas.push(response);
        this.resetNewReserva();
      },
      error: (error) => console.error('Error creating reserva:', error)
    });
  }

  updateReservaDetails(reserva: Reservas): void {
    this.reservaService.updateReserva(reserva).subscribe({
      next: (response: Reservas) => {
        const index = this.reservas.findIndex(r => r.id === response.id);
        if (index !== -1) {
          this.reservas[index] = response;
        }
      },
      error: (error) => console.error('Error updating reserva:', error)
    });
  }

  deleteReserva(id: number): void {
    this.reservaService.deleteReserva(id).subscribe({
      next: () => {
        this.reservas = this.reservas.filter(r => r.id !== id);
      },
      error: (error) => console.error('Error deleting reserva:', error)
    });
  }

  resetNewReserva(): void {
    this.newReserva = {
      id: 0,
      cantidadAdultos: 0,
      cantidadNinos: 0,
      duracionReserva: '01:00:00',
      fecha: new Date(),
      horaFin: '',
      horaInicio: '',
      cliente: {} as Clientes,
      empleado: {} as Empleado,
      tarifas: []
    };
  }
}