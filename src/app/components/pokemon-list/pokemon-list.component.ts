//pokemon-list-component.ts
import { CatalogueService } from 'src/app/services/catalogue.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @Input() pokemons: Pokemon[] = [];
  surveyListError: string | undefined;

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit(): void {
    try {
      this.catalogueService.getPokemons().subscribe((data) => {
        this.pokemons = data.results;
        this.pokemons.map((pokemon, index) => {
          pokemon.id = index + 1;
          pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`;
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}
