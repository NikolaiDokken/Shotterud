import React from "react";
import {
  Grid,
  Typography,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Slider,
  MenuItem,
  Select
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import NameChips from "./NameChips";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings(props) {
  const handleToggle = () => {
    props.setOpen(!props.open);
    window.location.reload();
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleToggle}
      TransitionComponent={Transition}
    >
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleToggle}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        style={{ padding: "16px", width: "inherit" }}
        spacing={4}
      >
        <Grid item xs>
          <Typography>Minimum/Maximum time (min) before spin</Typography>
          <Slider
            value={props.settings.minMaxSec}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={0.5}
            max={20}
            onChange={(e, value) => {
              props.setSettings({
                ...props.settings,
                minMaxSec: value
              });
              window.sessionStorage.setItem(
                "minMaxSec",
                JSON.stringify(props.settings.minMaxSec)
              );
            }}
          />
        </Grid>
        <Grid item xs>
          <Typography>Max amt. of spinners</Typography>
          <Select
            value={props.settings.amtSpinners}
            onChange={e => {
              props.setSettings({
                ...props.settings,
                amtSpinners: e.target.value
              });
              window.sessionStorage.setItem(
                "amtSpinners",
                JSON.stringify(e.target.value)
              );
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </Grid>
        <Grid item xs>
          <NameChips names={props.names} setNames={props.setNames} />
        </Grid>
      </Grid>
    </Dialog>
  );
}
