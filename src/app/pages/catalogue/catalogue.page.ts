import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss']
})
export class CataloguePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.catalogueService.pokemons;
  }

  get loading(): boolean {
    return this.catalogueService.loading; 
  }

  get error(): string {
    return this.catalogueService.error;
  }
  constructor(
    private readonly catalogueService: CatalogueService
  ) { }

  ngOnInit(): void {
    this.catalogueService.findAllPokemons();
  }

}
