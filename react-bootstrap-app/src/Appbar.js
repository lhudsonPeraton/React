import React, { Component } from "react";
// Import all components needed from material UI
import { AppBar, Toolbar, IconButton, Box, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: ["Weather", "Cryptocurrency", "Security"],
            isMenuOpen: false,
            anchor: null
        }
    }

    handleClose = () => {
        this.setState({
            isMenuOpen: false,
            anchor: null
        });
    }

    handleSelectPage = (page) => {
        this.props.handleSelectPage(page);
        this.handleClose();
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
                        onClick={(e) => {
                            this.setState({
                                isMenuOpen: true,
                                anchor: e.target
                            });
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={this.state.anchor}
                        open={this.state.isMenuOpen} // Component's state controls whether the Menu is opened or not
                        onClose={() => {this.handleClose()}}
                        
                    >
                        <MenuItem onClick={() => {this.handleSelectPage(this.state.tabs[0])}}>{this.state.tabs[0]}</MenuItem>
                        <MenuItem onClick={() => {this.handleSelectPage(this.state.tabs[1])}}>{this.state.tabs[1]}</MenuItem>
                        <MenuItem onClick={() => {this.handleSelectPage(this.state.tabs[2])}}>{this.state.tabs[2]}</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {this.props.activePage}
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

}


export default Appbar;