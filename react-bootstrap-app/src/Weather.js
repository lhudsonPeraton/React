import React, { useState, useEffect } from "react";
// Import react leaflet components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';
// Import Material UI components
import { Input, Button, Tooltip, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
// Import axios for making calls to the weather API
import axios from "axios";

const homePosition = [37.227746, -80.421960];

function Weather() {
    const [position, setPosition] = useState({lat: 37.227746, lng: -80.421960});
    const [tempPosition, setTempPosition] = useState(position);
    const [forecast, setForecast] = useState(null);
    const [location, setLocation] = useState(null);

    const fetchWeatherData = () => {
        axios.get(
            `https://api.weather.gov/points/${position.lat},${position.lng}`
        )
        .then((res) => {
            console.log(res);
            setLocation(res.data.properties.relativeLocation.properties);
            axios.get(
                `${res.data.properties.forecast}`
            )
            .then((res) => {
                console.log(res);
                setForecast(res.data.properties.periods);
            })
            .catch((err) => {
                alert(err);
            })
        })
        .catch((err) => {
            alert(err);
        })
    }

    return (
        <div className="weather-page-container">
            <div className="weather-sidepanel">
                <div className="locator">
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
                                    fetchWeatherData();
                                }}
                            >
                                <CloudIcon/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                <div className="daily-weather-panel">
                    <div className="daily-weather-header">
                        <Typography className="panel-header forecast" variant="h4">
                            Today's Forecast
                        </Typography>
                        <Typography className="panel-header" variant="h3">
                            {location !== null ? location.city : "City"}
                        </Typography>
                        <Typography className="panel-header" variant="h5">
                            {location !== null ? location.state : "State"}
                        </Typography>
                    </div>
                    <div className="daily-weather-body">
                        <div className="daily-weather-data">
                            <Typography variant="h6">
                                Temperature
                            </Typography>
                            <Typography paragraph={true}>
                                {forecast !== null ? forecast[0].temperature + '\u00b0' + "F" : "N/A"}
                            </Typography>
                        </div>
                        <div className="daily-weather-data">
                            <Typography variant="h6">
                                Short Forecast
                            </Typography>
                            <Typography paragraph={true}>
                                {forecast !== null && forecast[0].shortForecast !== null ? forecast[0].shortForecast : "N/A"}
                            </Typography>
                        </div>
                        <div className="daily-weather-data">
                            <Typography variant="h6">
                                Wind Direction
                            </Typography>
                            <Typography paragraph={true}>
                                {forecast !== null ? forecast[0].windDirection : "N/A"}
                            </Typography>
                        </div>
                        <div className="daily-weather-data">
                            <Typography variant="h6">
                                Wind Speed
                            </Typography>
                            <Typography paragraph={true}>
                                {forecast !== null ? forecast[0].windSpeed : "N/A"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className="weather-map">
                <MapContainer center={homePosition} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Map setPosition={setPosition} setTempPosition={setTempPosition} position={position}/>
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
            props.setTempPosition(e.latlng);
        }
    })
    useEffect(() => {
        map.panTo(props.position);
    })
    return null
}

export default Weather;