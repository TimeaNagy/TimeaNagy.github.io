import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { transform, fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map
  ngOnInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: transform([17.553316, 48.158397], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17, maxZoom: 18,
      }),
    });


    var markers = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '../../assets/icons/icon.png'
        })
      })
    });
    this.map.addLayer(markers);

    var marker = new Feature(new Point(fromLonLat([17.553316, 48.158397])));
    // @ts-ignore: Object is possibly 'null'.
    markers.getSource().addFeature(marker);
  }
}
