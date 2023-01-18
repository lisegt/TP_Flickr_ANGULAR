import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Flickr';
  copyright = '@Lise Gauthier';
  key = 'c79ccfe959473fe0156d3a677f809ed2';

  //propriété pour le contenu de l'input
  tag = '';
  //propriété pour contenu de liste des photos
  photos: any;
  photo_courante: any;

  //méthode exécutée lors d'un changement d'input, stocke le résultat du get --> objet JSON : photos
  nouveau_mot_cle(): void {
    this.getPhotos().subscribe((resp) => (this.photos = resp.photos));
  }

  //création de l'objet http
  constructor(private http: HttpClient) {}

  //gérer les erreurs
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Erreur client ou réseau.
      console.error('An error occurred:', error.error);
    } else {
      // Le backend a retourné un code d'erreur.
      // La réponse peut contenir un message d'erreur.
      console.error(
        `Erreur du backend avec code ${error.status}, le message est: `,
        error.error
      );
    }

    // Retour d'un observable avec un message d'erreur.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  //Récupérer la liste de photos à partir de l'API
  private getPhotos(): Observable<any> {
    let url =
      'https://api.flickr.com/services/rest?' +
      'nojsoncallback=1&method=flickr.photos.search&api_key=' +
      this.key +
      '&tags=' +
      this.tag +
      '&format=json';
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  //retourne construction de l'URL de l'image passée en paramètre
  getPhotoUrl(photo: any): string {
    return `http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`;
  }
}
