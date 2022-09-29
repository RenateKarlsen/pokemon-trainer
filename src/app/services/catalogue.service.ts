import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-key.enum';
import { Pokemon, PokemonResult } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';
const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  get pokemon(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public findAllPokemons(): void {
    if (this._pokemons.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    this.http
      .get<PokemonResult>(apiPokemon)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (response: PokemonResult) => {
          this._pokemons = response.results;
          StorageUtil.storageSave<Pokemon[]>(
            StorageKeys.Pokemon,
            this._pokemons
          );
          this._pokemons = response.results.map((pokemon) => {
            return {
              ...pokemon,
              ...this.getIdAndImage(pokemon.url),
            };
          });
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  public pokemonById(id: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.id === id);
  }

  private getIdAndImage(url: string): any {
    const id = url.split('/').filter(Boolean).pop();
    return {
      id,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }
}
