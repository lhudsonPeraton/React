import React, { useState, useEffect } from "react";
// Import react leaflet components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';
// Import Material UI components
import { Input, Button, Tooltip } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
// Import axios for making calls to the weather API
import axios from "axios";

const homePosition = [37.227746, -80.421960];

function Weather() {
    const [position, setPosition] = useState({lat: 37.227746, lng: -80.421960});
    const [tempPosition, setTempPosition] = useState(position);

    return (
        <div className="weather-page-container">
            <div className="weather-sidepanel">
                <Input 
                    className="latlng-input"
                    startAdornment="Lat:"
                    value={tempPosition.lat}
                    onChange={(e) => {
                        setTempPosition({lat: e.target.value, lng: tempPosition.lng});
                    }}
                />
                <Input 
                    className="latlng-input"
                    startAdornment="Lng:"
                    value={tempPosition.lng}
                    onChange={(e) => {
                        setTempPosition({lat: tempPosition.lat, lng: e.target.value});
                    }}
                />
                <div className="button-wrapper">
                    <Button
                        className="latlng-button"
                        onClick={() => {
                            setPosition({lat: tempPosition.lat, lng: tempPosition.lng});
                        }}
                    >
                        Go
                    </Button>
                </div>
                <div className="button-wrapper">
                    <Tooltip title="Get Weather Data" placement="bottom">
                        <Button
                            className="latlng-button"
                            onClick={() => {
                                
                            }}
                        >
                            <CloudIcon/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="weather-map">
                <MapContainer center={homePosition} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Map setPosition={setPosition} position={position}/>
                    <Marker
                        position={[
                            position.lat,
                            position.lng
                        ]}
                    />
                </MapContainer>
            </div>
        </div>
    );
}

function Map(props) {
    const map = useMapEvents({
        click: (e) => {
            props.setPosition(e.latlng);
        }
    })
    useEffect(() => {
        map.panTo(props.position);
    })
    return null
}

export default Weather;