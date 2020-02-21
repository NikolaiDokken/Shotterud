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
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings(props) {
  const handleToggle = () => {
    props.setOpen(!props.open);
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
      <Grid container justify="center" style={{ width: "100%" }}>
        <Grid
          containter
          direction="column"
          style={{ padding: "16px", width: "inherit" }}
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
              }}
            />
          </Grid>
          <Grid container justify="center" xs>
            <Grid item direction="column">
              <TextField
                label="Number of spinners"
                type="number"
                variant="outlined"
                value={props.settings.amtSpinners}
                onChange={e =>
                  props.setSettings({
                    ...props.settings,
                    amtSpinners:
                      e.target.value < 1
                        ? 1
                        : e.target.value > 4
                        ? 4
                        : e.target.value
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
