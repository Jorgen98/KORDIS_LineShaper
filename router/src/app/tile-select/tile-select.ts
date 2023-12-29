import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../map/map.service';
import { DataService } from '../data.service';

@Component({
    selector: 'tile-select',
    templateUrl: './tile-select.html',
    styleUrls: ['./tile-select.css']
})

export class TileSelectComponent implements OnInit {
    constructor(private mapService: MapService, private dataService: DataService) {}
    @ViewChild('option', { static: true}) tiles!: ElementRef;
    tileIndx = ["", "", ""];
    netLayers = ["", "", "", ""];
    

    ngOnInit() {
        this.tileIndx[this.dataService.getTileIndex()] = "opt_selected";
        let acNetLayersState = this.mapService.getBackgroundLayersState();

        let keys = Object.keys(acNetLayersState);

        for (let i = 0; i < keys.length; i++) {
            if (acNetLayersState[keys[i]]) {
                this.netLayers[i] = "opt_selected";
            }
        }
    }

    changeTiles(id: number): void {
        for (let i = 0; i < this.tileIndx.length; i++) {
            if (i != id) {
                this.tileIndx[i] = "";
            }
        }

        this.tileIndx[id] = "opt_selected";
        this.mapService.changeBaseMap(id);
    }

    changeLayerVisibility(id: number) {
        if (id === 0) {
            this.mapService.flipBackgroundLayersState('rail');
        } else if (id === 1) {
            this.mapService.flipBackgroundLayersState('road');
        } else if (id === 2) {
            this.mapService.flipBackgroundLayersState('tram');
        } else {
            this.mapService.flipBackgroundLayersState('midPoint');
        }

        if (this.netLayers[id] === "") {
            this.netLayers[id] = "opt_selected";
        } else {
            this.netLayers[id] = "";
        }
    }
}
