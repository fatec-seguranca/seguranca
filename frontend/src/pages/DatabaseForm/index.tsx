import React, { useState } from "react";

import {
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  makeStyles,
} from "@material-ui/core";
import StorageIcon from "@material-ui/icons/Storage";

import { useSnackbar } from "notistack";

import axios from "axios";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Landing: React.FC = () => {
  const [host, setHost] = useState<string>("");
  const [database, setDatabase] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");

    await axios
      .post("http://localhost:8080/createConnection", {
        host,
        database,
        port,
        username,
        password,
      })
      .then((response) => {
        if (response.data.status === 1) {
          enqueueSnackbar(`Database connection successfully established.`, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
        } else {
          enqueueSnackbar(response.data.error, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/getDatabaseConfig").then((response) => {
      if (response.data.status === 1) {
        setHost(response.data.databaseConfig.host || "");
        setDatabase(response.data.databaseConfig.database || "");
        setPort(response.data.databaseConfig.port || "");
        setUsername(response.data.databaseConfig.username || "");
        setPassword(response.data.databaseConfig.password || "");
      } else {
        enqueueSnackbar(response.data.error, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    });
  }, []);
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
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="port"
            label="Port"
            id="port"
            autoComplete="port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
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
