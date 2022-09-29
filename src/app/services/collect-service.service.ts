import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { CatalogueService } from './catalogue.service';
import { TrainerService } from './trainer.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly catalogueService: CatalogueService,
    private readonly trainerService: TrainerService
  ) {}

  public addToCollection(pokemonId: string): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error('addToCollection: There is no trainer');
    }

    const trainer: Trainer = this.trainerService.trainer;

    const pokemon: Pokemon | undefined =
      this.catalogueService.pokemonById(pokemonId);

    if (!pokemon) {
      throw new Error('addToCollection: No pokemon with id: ' + pokemonId);
    }

    if (this.trainerService.inCollection(pokemonId)) {
      this.trainerService.removeFromCollection(pokemonId);
      throw new Error('addToCollection: Pokemon already collected!');
    } else {
      this.trainerService.addToCollection(pokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    this._loading = true;

    return this.http
      .patch<Trainer>(
        apiTrainers + '/' + trainer.id,
        {
          pokemon: [...trainer.pokemon],
        },
        {
          headers,
        }
      )
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      );
  }
}
