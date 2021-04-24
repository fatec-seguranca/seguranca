import React from 'react';

import DatabaseForm from './pages/DatabaseForm';

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
        <DatabaseForm />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
