import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  public service = inject(UsuarioService);
  public router = inject(Router);
  public usuario: any = {};

  autenticar(): void {
      if (this.usuarioLogin.valid) {
        const dadosLogin = this.usuarioLogin.value;

        this.service.autenticar(dadosLogin).subscribe({
          next: (resposta) => {
            console.log('Login Sucesso:', resposta);
            this.router.navigate(['/']);
          },
          error: (erro) => {
            alert('Email ou senha inválidos!');
          }
        });
      } else {
        alert('Preencha os campos corretamente.')
      }
  }

  public usuarioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });
}

