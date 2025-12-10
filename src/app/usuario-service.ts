import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private API_URL = 'http://localhost:8080';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();
  
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/usuarios', usuario);
  }

  autenticar(loginData: any): Observable<string> {
    return this.http.post(`${this.API_URL}/usuarios/autenticar`, loginData, {
      responseType: 'text',
      withCredentials: true
    }).pipe(
      tap(() => this._isLoggedIn.next(true)),
        catchError((err) => {
        this._isLoggedIn.next(false);
        return throwError(() => err)
      })
    );
  }

  logout(): void {
    this.logoutAPI().subscribe({
        next: () => {
            console.log('Logout completo. Redirecionando...');
            this.router.navigate(['/']); 
        },
        error: () => {
             // Em caso de erro HTTP (ex: servidor caiu), ainda garanta que o estado local foi limpo e redirecione
             this.router.navigate(['/']);
        }
    });
  }

  logoutAPI(): Observable<any> {
    return this.http.post(`${this.API_URL}/usuarios/logout`, null, {
        withCredentials: true
    }).pipe(
        // Após o sucesso (o cookie foi destruído no navegador)
        tap(() => {
            this._isLoggedIn.next(false); // Limpa o estado local
            this._userRole.next(null);
            // Poderia navegar aqui, mas vamos deixar no componente
        }),
        catchError((err) => {
            // Se o logout falhar (o cookie já expirou ou foi inválido), ainda assim limpe o estado local
    this._isLoggedIn.next(false);
            this._userRole.next(null);
            // Não precisa de throwError aqui, pois o logout deve sempre tentar limpar o estado local
            return err;
        })
    );
  }
}

export interface AuthStatusResponse {
  logado: string;
  perfil: string;
}