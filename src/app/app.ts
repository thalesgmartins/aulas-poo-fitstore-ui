import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Header } from "./leiaute/header/header";
import { Footer } from "./leiaute/footer/footer";
import { Menu } from "./leiaute/menu/menu";
import { filter, map } from 'rxjs';
import { UsuarioService } from './usuario-service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Header, Footer, Menu, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce');

  // Injetando coisas
  router = inject(Router);
  private usuarioService = inject(UsuarioService);

  showMenu: boolean = true;

  ngOnInit(): void {
    // Verifica se o menu de navegação deve aparecer ou não
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd), map(event => event as NavigationEnd)).subscribe((event:NavigationEnd) => {const url = event.urlAfterRedirects; this.showMenu = !url.includes('/login') && !url.includes('/cadastro');});
  
    // Carrega autenticação
    this.usuarioService.checkAuthStatus().subscribe({
      error: () => console.log('Sessão não encontrada ou expirada.')
    })
  }
}
