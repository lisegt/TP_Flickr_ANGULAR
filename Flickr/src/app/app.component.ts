import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flickr';
  copyright = "@Lise Gauthier";

  //propriété pour le contenu de l'input
  tag = ""
}
