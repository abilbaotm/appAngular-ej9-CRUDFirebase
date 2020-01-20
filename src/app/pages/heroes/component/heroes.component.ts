import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../../services/heroes.service';
import {Heroe} from '../../../interfaces/heroe.interface';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any;
  loading: boolean;

  constructor(private heroesService: HeroesService,
              private router: Router) {
    this.heroes = [];
    this.loading = true;
  }

  ngOnInit() {
    this.heroesService.getHeroes().subscribe(
    (res) => {
      this.heroes = [];
      this.loading = false;
      res.forEach((heroeData: any) => {
        const heroe: Heroe = heroeData.payload.doc.data();
        heroe.key$ = heroeData.payload.doc.id;
        this.heroes.push(heroe);
        console.log( heroeData.payload.doc.id);

      });
    }
    );
  }

  removeHeroe(key: string) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta accion no se puede deshacer',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55', confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.heroesService.deleteHeroe(key).then( () => {
          Swal.fire(
            '¡Eliminado!',
            'Heroe eliminado',
            'success'
          );
          }

        );
      }
    });



  }
}
