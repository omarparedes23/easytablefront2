import { Component, Input, OnInit } from '@angular/core';
import { Imenu } from '../interface/imenu';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardmenu',
  templateUrl: './cardmenu.component.html',
  styleUrl: './cardmenu.component.scss',
})
export class CardmenuComponent implements OnInit {
  constructor(private router: Router, private localStore: LocalService) {}
  @Input() cardrestomodel!: Imenu;
  ngOnInit(): void {}
  onLogin(): void {
    this.router.navigateByUrl('login');
  }
}
