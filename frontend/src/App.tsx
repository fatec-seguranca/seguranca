import React from 'react';

import Routes from './routes'

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

import {SnackbarProvider} from 'notistack'
const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
