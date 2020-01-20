import { Injectable } from '@angular/core';
import {Heroe} from '../interfaces/heroe.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(
      private firestore: AngularFirestore
  ) {}

  postHeroe( heroe: Heroe) {
    console.log('postHeroe');
    return this.firestore.collection( 'heroes').add(heroe);
  }

  putHeroe( heroe: Heroe, key$: string ) {
    console.log('putHeroe');
    return this.firestore.collection('heroes').doc(key$).update(heroe);
  }

  getHeroe( key$: string ) {
    return this.firestore.collection('heroes').doc(key$).snapshotChanges();
  }

  getHeroes() {
    console.log('getHeroes');
    return this.firestore.collection('heroes', ref => {
      return ref;
    }).snapshotChanges();
  }

  deleteHeroe( key$: string ) {
    console.log(key$)
    return this.firestore.collection('heroes').doc(key$).delete();
  }

}
