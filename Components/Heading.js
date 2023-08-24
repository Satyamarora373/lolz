import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Heading() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="standard-chartered-logo.png" alt="Standard Chartered Logo" height="30" />
        </Typography>
        <Button color="inherit">About</Button>
        <Button color="inherit">Support</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Heading;
