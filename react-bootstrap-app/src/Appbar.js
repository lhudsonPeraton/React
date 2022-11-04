import React, { Component } from "react";
// Import all components needed from material UI
import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

class Appbar extends Component {
    constructor() {
        super();
        this.state = {
            tabs: ["Weather", "Crypto", "Security"]
        }
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

}


export default Appbar;