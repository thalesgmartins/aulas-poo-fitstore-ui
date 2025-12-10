import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/categorias";
  
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
criar(obj: any): Observable<any> {
    return this.http.post(this.apiUrl, obj);
  }

  atualizar(id: number, obj: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, obj);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}