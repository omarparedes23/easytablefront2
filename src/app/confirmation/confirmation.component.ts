import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  nomresto!: string | null;
  addressresto!: string | null;
  telephoneresto!: string | null;
  datereservation!: string | null;
  heurereservation!: string | null;
  nombrepersonnes!: string | null;
  constructor(private localStore: LocalService) {}
  ngOnInit(): void {
    this.nomresto = this.localStore.getData('nomresto');
    this.addressresto = this.localStore.getData('addressresto');
    this.telephoneresto = this.localStore.getData('telephoneresto');
    this.datereservation = this.localStore.getData('datereservation');
    this.heurereservation = this.localStore.getData('heurereservation');
    this.nombrepersonnes = this.localStore.getData('nombrepersonnes');
  }
}
