import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
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
    this._loading = true;
    this.http
      .get<Pokemon[]>(apiPokemon)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: any) => {
          console.log(this._pokemons);
          console.log(pokemons);

          this._pokemons = pokemons.results;
          console.log(this._pokemons);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  getPokemons(): Observable<any> {
    return this.http.get(`${apiPokemon}/api/v2/pokemon?limit=100`);
  }
}
