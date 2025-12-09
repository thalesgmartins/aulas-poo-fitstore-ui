import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UsuarioService } from '../../usuario-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private usuarioService = inject(UsuarioService);

  public isLoggedIn$: Observable<boolean> = this.usuarioService.isLoggedIn$;

  logout() {
    this.usuarioService.logout();
  }

}
