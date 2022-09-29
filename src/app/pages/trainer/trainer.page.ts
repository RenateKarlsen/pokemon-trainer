import { TrainerService } from 'src/app/services/trainer.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage implements OnInit {
  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  get collected(): Pokemon[] {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon;
    }
    return [];
  }

  constructor(private readonly trainerService: TrainerService) {}

  ngOnInit(): void {}
}
