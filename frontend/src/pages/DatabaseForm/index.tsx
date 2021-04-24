import React, { useState } from 'react';

import {
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  makeStyles
} from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';

import {useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Landing: React.FC = () => {
  const [host, setHost] = useState<string>('');
  const [dbName, setDbName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit');
  };
  
  return (
    <Container component="main" maxWidth="xs" className="popIn">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StorageIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Database
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="host"
            label="Host"
            name="host"
            autoComplete="host"
            autoFocus
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="dbName"
            label="Database name"
            id="dbName"
            autoComplete="database name"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Test connection
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Landing;