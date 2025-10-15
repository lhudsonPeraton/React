import React, { useState, useEffect } from "react";
// Import react leaflet components
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';
// Import Material UI components
import { Input, Button, Tooltip, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
// Import axios for making calls to the weather API
import axios from "axios";

// Former: Setting home position to the Virginia Tech drill field: 37.227746, -80.421960
// Former: Penn State University: 40.798214, -77.859909
//Penn State University Update: 40.798214, -77.859909
//UMD Position: 38.985995, -76.9414119
//GMU Position: 38.8314578, -77.314322
const homePosition = [38.8314578, -77.314322];

function Weather() {
    // Using React hooks to manage state of the Weather function component
    const [position, setPosition] = useState({lat: homePosition[0], lng: homePosition[1]}); // position is used for latitude and longitude passed into API
    const [tempPosition, setTempPosition] = useState(position); // tempPosition is used to handle input boxes
    const [forecast, setForecast] = useState(null); // forecast holds forecast data
    const [location, setLocation] = useState(null); // location holds location data

    // This method is called upon clicking the cloud button
    // This method updates the state with forecast and location data
    const fetchWeatherData = () => {
        // Using axios and the National Weather Service's REST API, we can get data near the given latitude and longitude
        axios.get(
            `https://api.weather.gov/points/${position.lat},${position.lng}`
        )
        .then((res) => {
            console.log(res);
            // Using the response from the get call, set the state's location
            setLocation(res.data.properties.relativeLocation.properties);
            // The response gives another API to hit to get forecast data
            axios.get(
                `${res.data.properties.forecast}`
            )
            .then((res) => {
                console.log(res);
                // Using the response from the get call, set the state's forecast
                setForecast(res.data.properties.periods);
            })
            .catch((err) => {
                alert("Could not find weather data for this location! Please try again.");
            })
        })
        .catch((err) => {
            alert(err);
        })
    }

    return (
        <div className="weather-page-container">
            <div className="weather-sidepanel">
                {/* This panel is used for navigating to a given position and fetching the weather data */}
                <div className="locator">
                    <Input 
                        className="latlng-input"
                        startAdornment="Lat:"
                        value={tempPosition.lat}
                        type="number"
                        onChange={(e) => {
                            setTempPosition({lat: e.target.value, lng: tempPosition.lng});
                        }}
                    />
                    <Input 
                        className="latlng-input"
                        startAdornment="Lng:"
                        value={tempPosition.lng}
                        type="number"
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
                {/* This panel is used for displaying the location and forecast held in this component's state */}
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
            {/* This panel uses React Leaflet to add a Map Container, use a default TileLayer to display the map, and set a marker */}
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

// This component handles events with the map
function Map(props) {
    const map = useMapEvents({
        // Clicking the map sets the position and tempPosition
        click: (e) => {
            props.setPosition(e.latlng);
            props.setTempPosition(e.latlng);
        }
    })
    // useEffect runs upon the component mounting and updating,
    // so whenever position is updated, the map will pan to new position
    useEffect(() => {
        map.panTo(props.position);
    })
    return null
}

export default Weather;
