import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../categoria-service';
import { MarcaService } from '../../marca-service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  // Injeta os seviços no código
  private categoriaService = inject(CategoriaService);
  private marcaService = inject(MarcaService);

  // Exporta as categorias e marcas
  public listaCategorias: any[] = [];
  public listaMarcas: any[] = [];

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
}
