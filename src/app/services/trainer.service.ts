import { StorageKeys } from './../consts/storage-key.enum';
import { StorageUtil } from './../utils/storage.util';
import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  public set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
    console.log(this._trainer?.id);
  }

  public inCollection(pokemonId: string): boolean {
    if (this._trainer) {
      return Boolean(
        this.trainer?.pokemon.find(
          (pokemon: Pokemon) => pokemon.id === pokemonId
        )
      );
    }
    return false;
  }

  public addToCollection(pokemon: Pokemon): void {
    if (this._trainer) {
      console.log(pokemon.name + 'hæ');
      this._trainer.pokemon.push(pokemon);
    }
  }
}
