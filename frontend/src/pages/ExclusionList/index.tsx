import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  makeStyles,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import StorageIcon from "@material-ui/icons/Storage";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
}));

interface ExclusionItem {
  table: string;
  identifiers: Array<number>;
}

const Landing: React.FC = () => {
  const [table, setTable] = useState<string>("");
  const [exclusionList, setExclusionList] = useState<ExclusionItem[]>([]);
  const classes = useStyles();

  const getList = async () => {
    const exclusionList = await axios.get("http://localhost:8080/getList", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    setExclusionList(exclusionList.data.exclusionList);
  };

  const updateTable = async (newIdentifier: number, tableName: string) => {
    await axios
      .post("http://localhost:8080/updateList", { newIdentifier, tableName })
      .then((response) => {
        setExclusionList(response.data.exclusionList);
      });
  };

  const deleteId = async (identifier: number, tableName: string) => {
    await axios
      .post("http://localhost:8080/deleteId", { identifier, tableName })
      .then((response) => {
        setExclusionList(response.data.exclusionList);
      });
  };

  const deleteTable = async (tableName: string) => {
    await axios
      .post("http://localhost:8080/deleteTable", {tableName })
      .then((response) => {
        setExclusionList(response.data.exclusionList);
      });
  };

  const addTable = async (tableName: string) => {
    await axios
      .post("http://localhost:8080/addTable", { tableName })
      .then((response) => {
        setExclusionList(response.data.exclusionList);
        setTable("");
      });
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <Container component="main" maxWidth="xs" className="popIn">
      <div className={classes.paper}>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Avatar className={classes.avatar}>
              <StorageIcon />
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginTop: "10px" }}
            >
              Exclusion List
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="host"
              label="Table name"
              name="host"
              autoComplete="host"
              autoFocus
              value={table}
              onChange={(e) => setTable(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              style={{ margin: "20px" }}
              onClick={() => {
                addTable(table);
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info" style={{ marginBottom: "10px" }}>
              Below are the registered tables and their respective identifiers
              that were saved in the exclusion list
            </Alert>
          </Grid>

          <Grid item xs={12}>
            {exclusionList.map((item, i) => {
              return (
                <Accordion key={i} className="popIn">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.heading}>
                      {item.table}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="secondary" onClick={() => deleteTable(item.table)}>
                          Delete Table
                        </Button>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id={`${item.table}_input`}
                          label="ID"
                          name="ID"
                          autoComplete="ID"
                          type="number"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Fab
                          color="primary"
                          aria-label="add"
                          size="small"
                          style={{ margin: "20px" }}
                          onClick={() => {
                            let id: any = (document.getElementById(
                              `${item.table}_input`
                            ) as HTMLInputElement).value;
                            updateTable(parseInt(id), item.table);
                          }}
                        >
                          <AddIcon />
                        </Fab>
                      </Grid>
                      <Grid item xs={12}>
                        <List className={classes.root} subheader={<li />}>
                          <li className={classes.listSection}>
                            <ul className={classes.ul}>
                              {item.identifiers.map((id, i) => {
                                return (
                                  <ListItem key={i} className="popIn">
                                    <ListItemText>
                                      <Grid container>
                                        <Grid item xs={2}>
                                          {id}
                                        </Grid>
                                        <Grid item xs={10}>
                                          <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                              deleteId(id, item.table)
                                            }
                                          >
                                            Delete
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </ListItemText>
                                  </ListItem>
                                );
                              })}
                            </ul>
                          </li>
                        </List>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Landing;
