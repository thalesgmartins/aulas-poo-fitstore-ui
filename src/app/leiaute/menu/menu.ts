import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../categoria-service';
import { MarcaService } from '../../marca-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../usuario-service';
import { ProdutoService } from '../../produto-service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  // Injeta os seviços no código
  private categoriaService = inject(CategoriaService);
  private marcaService = inject(MarcaService);
  private usuarioService = inject(UsuarioService);
  private produtoService = inject(ProdutoService);

  // Exporta as categorias e marcas
  public listaCategorias: any[] = [];
  public listaMarcas: any[] = [];

  isLoggedIn$ = this.usuarioService.isLoggedIn$;

  // Gancho que roda ao carregar o componente
  ngOnInit(): void {

    // Puxa as Categorias
    this.categoriaService.listar().subscribe({
      next: (categorias) => {
        this.listaCategorias = categorias;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
      }
    });

    // Puxas as Marcas
    this.marcaService.listar().subscribe({
      next: (marcas) => {
        this.listaMarcas = marcas;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);
      }
    });
  }
    onFilterChange(event: any, tipo: 'marca' | 'categoria', id: number) {
    const checked = event.target.checked;
    this.produtoService.atualizarFiltro(tipo, id, checked);
  }

  logout() {
    this.usuarioService.logout();
  }
}
