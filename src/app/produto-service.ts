import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/produtos';
  
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  salvar(produto: any): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }

  // Método para enviar a foto antes de salvar o produto
  uploadImagem(file: File): Observable<{ uuid: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ uuid: string }>(`${this.apiUrl}/upload`, formData);
  }
}
