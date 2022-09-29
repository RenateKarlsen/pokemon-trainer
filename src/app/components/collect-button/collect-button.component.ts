import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectService } from 'src/app/services/collect-service.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.scss'],
})
export class CollectButtonComponent implements OnInit {
  public loading: boolean = false;
  public isCollected: boolean = false;
  @Input() pokemonId: string = '';

  constructor(
    private readonly collectService: CollectService,
    private readonly trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.isCollected = this.trainerService.inCollection(this.pokemonId);
    console.log(this.isCollected + 'ngOnInit');
  }

  collectClick(): void {
    this.loading = true;

    console.log(this.pokemonId);
    this.collectService.addToCollection(this.pokemonId).subscribe({
      next: (trainer: Trainer) => {
        this.loading = false;
        this.isCollected = this.trainerService.inCollection(this.pokemonId);
        console.log('NEXT', trainer);
        console.log(this.isCollected);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        console.log('ERROR', error.message);
      },
    });
  }
}
