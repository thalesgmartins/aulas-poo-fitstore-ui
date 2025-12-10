import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/produtos';

  private filtrosSubject = new BehaviorSubject<{ marcas: number[], categorias: number[] }>({
    marcas: [],
    categorias: []
  });

  filtros$ = this.filtrosSubject.asObservable();
  
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
  
  atualizarFiltro(tipo: 'marca' | 'categoria', id: number, checked: boolean) {
    const atual = this.filtrosSubject.value;
    let lista = tipo === 'marca' ? [...atual.marcas] : [...atual.categorias];

    if (checked) {
      lista.push(id); // Adiciona
    } else {
      lista = lista.filter(item => item !== id); // Remove
    }

    // Emite o novo estado
    this.filtrosSubject.next({
      marcas: tipo === 'marca' ? lista : atual.marcas,
      categorias: tipo === 'categoria' ? lista : atual.categorias
    });
  }
}
