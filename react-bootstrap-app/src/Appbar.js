import React, { Component } from "react";
// Import all components needed from material UI
import { AppBar, Toolbar, IconButton, Box, Typography, Menu, MenuItem } from '@mui/material';
// Import the icon for menu dropdown
import MenuIcon from "@mui/icons-material/Menu";

class Appbar extends Component {
    constructor(props) {
        super(props); // Super refers to the parent class constructor and allows us to use the keyword "this" in reference to this component.
        // Setting component's default state
        this.state = {
            tabs: ["Weather", "Cryptocurrency", "Security"],
            isMenuOpen: false,
            anchor: null
        }
    }

    // This method sets boolean that controls whether menu is open to false and removes the anchor object
    handleClose = () => {
        this.setState({
            isMenuOpen: false,
            anchor: null
        });
    }

    // This method calls the handleSelectPage from the parent class and then closes the menu
    handleSelectPage = (page) => {
        this.props.handleSelectPage(page);
        this.handleClose();
    }

    render() {
        return (
            <div className="appbar-container">
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
                            anchorEl={this.state.anchor} // Uses this object as anchor point for the menu
                            open={this.state.isMenuOpen} // Component's state controls whether the Menu is opened or not
                            onClose={() => {this.handleClose()}}
                        >
                            <MenuItem onClick={() => {this.handleSelectPage(this.state.tabs[0])}}>{this.state.tabs[0]}</MenuItem>
                            <MenuItem onClick={() => {this.handleSelectPage(this.state.tabs[1])}}>{this.state.tabs[1]}</MenuItem>
                            <MenuItem onClick={() => {this.handleSelectPage(this.state.tabs[2])}}>{this.state.tabs[2]}</MenuItem>
                        </Menu>
                        {/* Uses the activePage prop from the parent component to render the navbar header */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {this.props.activePage}
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        );
    }
}

// Export the component so it can be imported in other files
export default Appbar;