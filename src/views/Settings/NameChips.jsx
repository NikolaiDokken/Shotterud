import React, { useEffect, useCallback } from "react";
import { Chip, Grid, Typography, TextField, Button } from "@material-ui/core";

export default function EnhancedTable(props) {
  const addName = useCallback(() => {
    const newName = document.querySelector("#inputName").value;
    if (newName === "" || newName.length > 20) return;
    props.names.push({ name: newName, selected: false });
    props.setNames(props.names.filter(mapName => true));
    document.querySelector("#inputName").value = "";
    window.sessionStorage.setItem("names", JSON.stringify(props.names));
  }, [props]);

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
        <Typography variant="h4">Add Names</Typography>
      </Grid>
      <Grid container item justify="center">
        <TextField id="inputName" label="Add name"></TextField>
        <Button variant="outlined" onClick={addName}>
          Add
        </Button>
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
