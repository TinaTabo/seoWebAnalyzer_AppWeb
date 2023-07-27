import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  //-- Datos de prueba
  items = [
    { url: 'https://www.example1.com', date: '2023-07-25 10:00:00' },
    { url: 'https://www.example2.com', date: '2023-07-24 14:00:00' },
    { url: 'https://www.example3.com', date: '2023-07-23 09:30:00' },
    { url: 'https://www.example4.com', date: '2023-07-22 16:45:00' },
    { url: 'https://www.example5.com', date: '2023-07-21 20:00:00' },
    { url: 'https://www.example7.com', date: '2023-07-21 20:00:00' },
    { url: 'https://www.example8.com', date: '2023-07-21 20:00:00' },
    { url: 'https://www.example9.com', date: '2023-07-21 20:00:00' },
    { url: 'https://www.example10.com', date: '2023-07-21 20:00:00' },
    { url: 'https://www.example11.com', date: '2023-07-21 20:00:00' },
  ];
}
