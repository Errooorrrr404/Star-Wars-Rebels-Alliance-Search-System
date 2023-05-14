import { AppBar, Container, Toolbar, Box } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";


function LayoutAuth() {
    const navigate = useNavigate();
    return (
      <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <img src="/logo.png" alt="Star Wars" style={{height: 55, cursor: 'pointer'}} onClick={() => navigate('/', {replace: true})}/>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Box style={{margin: 16}}>
        <Outlet />
      </Box>
      </>
    );
}

export default LayoutAuth;