import React, { useEffect, useCallback } from "react";
import {
  Chip,
  Grid,
  Typography,
  TextField,
  Theme,
  Button
} from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  createStyles
} from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff3d42"
    },
    error: {
      main: "#ff3d42",
      color: "white"
    }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    input: {
      color: "white"
    },
    margin: {
      margin: theme.spacing(1)
    }
  })
);

export default function EnhancedTable(props) {
  const addName = useCallback(() => {
    const newName = document.querySelector("#inputName").value;
    if (newName === "" || newName.length > 20) return;
    props.names.push({ name: newName, selected: false });
    props.setNames(props.names.filter(mapName => true));
    document.querySelector("#inputName").value = "";
    window.sessionStorage.setItem("names", JSON.stringify(props.names));
  }, [props]);
  const classes = props.css;
  const classes1 = useStyles();

  const handleDelete = name => {
    props.setNames(props.names.filter(mapName => mapName !== name));
    window.sessionStorage.setItem(
      "names",
      JSON.stringify(props.names.filter(mapName => mapName !== name))
    );
  };

  useEffect(() => {
    document.querySelector("#inputName").addEventListener(
      "keypress",
      function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.key === "Enter") {
          addName();
        }
      },
      true
    );
  }, [addName]);

  return (
    <Grid container direction="column" spacing={4}>
      <Grid container item justify="center">
        <Typography className={classes.text} variant="h4">
          Add Names
        </Typography>
      </Grid>
      <Grid container item justify="center">
        <ThemeProvider theme={theme}>
          <TextField
            error
            input={{ style: { color: "#fff" } }}
            InputLabelProps={{
              style: { color: "white" }
            }}
            labelProps={{
              cclassName: classes1.input
            }}
            InputProps={{
              className: classes1.input
            }}
            id="inputName"
            label="Add name"
          ></TextField>
          <Button
            className={classes.text}
            color="primary"
            variant="outlined"
            onClick={addName}
          >
            Add
          </Button>
        </ThemeProvider>
      </Grid>
      <Grid container item direction row justify="center">
        {props.names.map(name => (
          <Chip
            label={name.name.toUpperCase()}
            onDelete={() => handleDelete(name)}
            color="primary"
          />
        ))}
      </Grid>
    </Grid>
  );
}
