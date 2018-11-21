import {Component, Input, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() ids_array;
  lat = 43.678418;
  lng = -79.809007;
  locations =  [[43.678418 , -79.809007], [0 , 0], [43.638418 , -79.549007], [43.634418 , -79.765007]];

  constructor() {
  }

  ngOnInit(): void {
  }
}
