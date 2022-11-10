import React, { useState, useEffect } from "react";
// Import Material UI components
import { Button, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import Plot from 'react-plotly.js';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// Import axios for making calls to the crypto API
import axios from "axios";

function Crypto() {
    // Using React hooks to manage state of the crypto function component
    const [coinIds, setCoinIds] = useState([]); // coinIds holds list of coin id data
    const [selectId, setSelectedId] = useState(''); // selectId holds the selected object from the dropdown
    const [marketData, setMarketData] = useState(null); // marketData holds market data for request object
    const [plotData, setPlotData] = useState(null); // marketData holds market data for request object
    
    // handles the selection for the select box 
    const handleChange = (selectEvent)  => {
        setMarketData(null);
        setSelectedId(selectEvent.target.value)
    }

    //progamatically builds out the menuitems for the select box
    const getOptions = ()  => {
        return coinIds.map(id => {
            return <MenuItem key={id.id} value={id}>{id.symbol.toUpperCase()}</MenuItem>
        });
    }

    //Called once on component init. Fetches a list of coin ids and grabs a random chunk of it to be displayed in the drop down
    const fetchCoinIds = () => {
        // Using axios and the CoinGecko crypto REST API, we can get data near the given latitude and longitude
        axios.get(
            `https://api.coingecko.com/api/v3/coins/list`
        )
        .then((res) => {
            console.log(res);
            // Using the response from the get call, set the coin ids in the drop down
            setCoinIds(res.data.slice(5000, 5010));
        })
        .catch((err) => {
            alert(err);
        })
    }


    // This method is called upon clicking the cloud button
    // This method updates the state with forecast and location data
    const fetchCoinMarketData = () => {
        // Using axios and the CoinGecko Crypto REST API, we can get data near the given latitude and longitude
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${selectId.id}/market_chart?vs_currency=usd&days=14&interval=daily`
        )
        .then((res) => {
            console.log(res);
            // Using the response from the get call, set the market data 
            setMarketData(res.data);
        })
        .catch((err) => {
            alert(err);
        })
    }

    //Fetch coin ids after component mount
    useEffect(() => {
        fetchCoinIds();
    }, []);

    //Re-create plot data each time marketData changes
    useEffect(() => {
        if (marketData !== null){
            createPlotData();
        }
    }, [marketData]);

    //Transforms the market data into data that can be plotted
    const createPlotData = () => {
        let x =[];
        let y = [];
        marketData.prices.forEach(function(price) {
            let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(price[0]/1000);
            x.push(d)
            y.push(price[1].toFixed(8))
        })
        let trace1 = {
            type: 'scatter',
            x: x,
            y: y,
            mode: 'lines',
            name: 'Red',
            line: {
              color: 'rgb(219, 64, 82)',
              width: 3
            }
          };

        setPlotData([trace1]);
    }

    const averageTradeVolume = () => {
        let total = 0;
        marketData.total_volumes.forEach(function(volume) {
            total += volume[1];
        })
        return (total / marketData.total_volumes.length).toFixed(8);
    }

    const pricingInformation = () => {
        let total = 0;
        let max = 0;
        let min = -1;
        if (marketData !== null && marketData.prices !== null)
        marketData.prices.forEach(function(price) {
            let currentValue = price[1]
            total += currentValue;
            if (max < currentValue){
                max = currentValue
            }
            if (min == -1 || min > currentValue){
                min = currentValue;
            }
        })
        return (          
            <div className="daily-weather-body">              
                <div className="daily-weather-data">
                    <Typography variant="h6">
                        Avg. Volume
                    </Typography>
                    <Typography paragraph={true}>
                        {marketData !== null && marketData.total_volumes !== null ? averageTradeVolume() : "N/A"}
                    </Typography>
                </div>
                <div className="daily-weather-data">
                    <Typography variant="h6">
                        Avg. Price
                    </Typography>
                    <Typography paragraph={true}>
                        {total !== 0 ? '$' + (total / marketData.total_volumes.length).toFixed(8) : "N/A"}
                    </Typography>
                </div>
                <div className="daily-weather-data">
                    <Typography variant="h6">
                        Highest Price 
                    </Typography>
                    <Typography paragraph={true}>
                        {max !== 0 ? '$' + max.toFixed(8) : "N/A"}  
                    </Typography>
                </div>
                <div className="daily-weather-data">
                    <Typography variant="h6">
                        Lowest Price
                    </Typography>
                    <Typography paragraph={true}>
                        {min !== -1 ? '$' + min.toFixed(8) : "N/A"}
                    </Typography>
                </div>
            </div>
       );
    }

    return (
        <div className="weather-page-container">
            <div className="weather-sidepanel">
                {/* This panel is used for navigating to a given position and fetching the crypto data */}
                <div className="crypto-selector">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Coin type</InputLabel>
                            <Select
                                className="coin-type-selector"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectId}
                                label="Coin Id"
                                onChange={handleChange}
                            >
                                {getOptions()}
                            </Select>
                    </FormControl>
                    <div className="button-wrapper">
                        <Tooltip title="Get crypto Data" placement="bottom">
                            <Button
                                className="latlng-button"
                                onClick={() => {
                                    fetchCoinMarketData();
                                }}
                            >
                                <MonetizationOnIcon />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                {/* This panel is used for displaying the location and forecast held in this component's state */}
                <div className="daily-weather-panel">
                    <div className="daily-weather-header">
                        <Typography className="panel-header forecast" variant="h4">
                            14 Day Stats
                        </Typography>
                        <Typography className="panel-header" variant="h3">
                            {selectId !== '' ? selectId.symbol.toUpperCase() : "Coin Symbol"}
                        </Typography>
                    </div>
                    {pricingInformation()}
                </div>
            </div>
            {/* This panel uses a Plotly graph to display the market data */}
            <div className="weather-map">
                <Plot
                    data={plotData}
                    layout={ {width: 1280, height: 800, title: "Price Over 14 Days",   
                    xaxis: {
                        title: {
                          text: 'Date',
                          font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                          }
                        },
                      },
                      yaxis: {
                        title: {
                          text: 'Price in USD $',
                          font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                          }
                        }
                      }} 
                    }
                />
            </div>
        </div>
    );
}

export default Crypto;