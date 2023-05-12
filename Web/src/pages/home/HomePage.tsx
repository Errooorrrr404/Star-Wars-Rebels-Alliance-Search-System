import { Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, CssBaseline, AppBar, IconButton, Typography, Drawer, Button } from "@mui/material";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import MenuIcon from '@mui/icons-material/Menu';
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import SearchPage from "../search/SearchPage";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


function HomePage(props: Props) {

  return (
    <>
        <CssBaseline />
        <h1>Home Page</h1>
        <SearchPage type="people" />
    </>
  );
}

export default HomePage;