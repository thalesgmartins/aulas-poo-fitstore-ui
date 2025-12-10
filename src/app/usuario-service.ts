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
    this._isLoggedIn.next(false);
  }
}

export interface AuthStatusResponse {
  logado: string;
  perfil: string;
}