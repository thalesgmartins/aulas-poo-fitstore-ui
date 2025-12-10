import { Component, inject, OnInit } from '@angular/core';
import { ProdutoService } from '../produto-service';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [ CommonModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  private produtoService = inject(ProdutoService);

  todosProdutos: any[] = []; // Guarda a cópia original completa
  produtosFiltrados: any[] = []; // O que é exibido na tela

  public listaProdutos: any[] = [];

  ngOnInit() {
    // 1. Carrega os produtos e se inscreve nas mudanças de filtro
    // combineLatest: Espera os dois (lista e filtros) estarem prontos
    combineLatest([
      this.produtoService.listar(),
      this.produtoService.filtros$
    ]).subscribe(([produtos, filtros]) => {
      
      // Atualiza a lista original (apenas na primeira carga ou refresh)
      if (this.todosProdutos.length === 0) { 
         this.todosProdutos = produtos;
      }

      // 2. Aplica a Lógica de Filtragem
      this.produtosFiltrados = this.todosProdutos.filter(produto => {
        // Verifica Marca (se houver alguma selecionada)
        const passaMarca = filtros.marcas.length === 0 || filtros.marcas.includes(produto.marca?.id);
        
        // Verifica Categoria (se houver alguma selecionada)
        const passaCategoria = filtros.categorias.length === 0 || filtros.categorias.includes(produto.categoria?.id);

        return passaMarca && passaCategoria;
      });
    });
  }
}
