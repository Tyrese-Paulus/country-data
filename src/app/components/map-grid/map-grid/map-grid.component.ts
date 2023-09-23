import { Component } from '@angular/core';

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})
export class MapGridComponent {
  images = [
    {url: '../../../assets/p-1.jpg'},
    {url: '../../../assets/p-2.jpg'},
    // more images...
  ];
}
