import React from "react";
// Import react leaflet components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';

const homePosition = [37.227746, -80.421960];

function Weather() {

    return (
        <div className="weather-page-container">
            <div className="weather-sidepanel">

            </div>
            <div className="weather-map">
                <MapContainer center={homePosition} zoom={10}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Map />
                </MapContainer>
            </div>
        </div>
    );
}

function Map() {
    const map = useMapEvents({
        click: () => {
          map.locate()
        },
        locationfound: (location) => {
          console.log('location found:', location)
        },
      })
      return null
}

export default Weather;