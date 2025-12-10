import { Component, inject, OnInit } from '@angular/core';
import { MarcaService } from '../marca-service';
import { CategoriaService } from '../categoria-service';
import { ProdutoService } from '../produto-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  marcaService = inject(MarcaService);
  categoriaService = inject(CategoriaService);
  produtoService = inject(ProdutoService);

  // Estado
  abaAtual: 'produtos' | 'marcas' | 'categorias' = 'produtos';
  
  // Listas
  listaMarcas: any[] = [];
  listaCategorias: any[] = [];
  listaProdutos: any[] = [];


  // Objetos de Formulário (Edição/Criação)
  novaMarca: any = { descricao: '' };
  novaCategoria: any = { descricao: '' };
  novoProduto: any = { nome: '', descricao: '', preco: 0, quantidadeEstoque: 0, ativo: true, categoria: null, marca: null, imagem: '' };
  imagemSelecionada: File | null = null;

  ngOnInit() {
    this.carregarTudo();
  }

  carregarTudo() {
    this.marcaService.listar().subscribe(d => this.listaMarcas = d);
    this.categoriaService.listar().subscribe(d => this.listaCategorias = d);
    this.produtoService.listar().subscribe(d => this.listaProdutos = d);
  }

  // --- Gestão de Marcas ---
  salvarMarca() {
    this.marcaService.criar(this.novaMarca).subscribe(() => {
      this.carregarTudo();
      this.novaMarca = { descricao: '' }; // Limpa form
    });
  }

  deletarMarca(id: number) {
    if(confirm('Tem certeza?')) {
      this.marcaService.deletar(id).subscribe(() => this.carregarTudo());
    }
  }

  // --- Gestão de Categorias ---
  salvarCategoria() {
    this.categoriaService.criar(this.novaCategoria).subscribe(() => {
      this.carregarTudo();
      this.novaCategoria = { descricao: '' };
    });
  }

  deletarCategoria(id: number) {
    if(confirm('Tem certeza?')) {
      this.categoriaService.deletar(id).subscribe(() => this.carregarTudo());
    }
  }

  // --- Gestão de Produtos ---
  onFileSelected(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  salvarProduto() {
    if (this.imagemSelecionada) {
      // 1. Upload da Imagem
      this.produtoService.uploadImagem(this.imagemSelecionada).subscribe(res => {
        // 2. Associa o UUID retornado ao produto
        this.novoProduto.imagem = res.uuid;
        
        // 3. Salva o produto
        this.produtoService.salvar(this.novoProduto).subscribe(() => {
          this.carregarTudo();
          alert('Produto salvo!');
          // Limpa form (simplificado)
          this.novoProduto = { nome: '', descricao: '', preco: 0, quantidadeEstoque: 0, ativo: true, categoria: null, marca: null, imagem: '' };
          this.imagemSelecionada = null;
        });
      });
    } else {
      alert("Selecione uma imagem!");
    }
  }
}