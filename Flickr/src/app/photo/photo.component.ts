import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent {
  // on déclare la propriété photo dont la valeur sera obtenue à partir de l'attribut [photo] passé à la balise du composant (<app-photo>)
  @Input() photo: any;

  //retourne construction de l'URL de l'image passée en paramètre
  getPhotoUrl(): string {
    return `http://farm${this.photo.farm}.static.flickr.com/${this.photo.server}/${this.photo.id}_${this.photo.secret}_b.jpg`;
  }
}
