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
  Select,
  makeStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import NameChips from "./NameChips";
import "./Settings.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LocalBarIcon from "@material-ui/icons/LocalBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff3d42"
    },
    error: {
      main: "#ff3d42"
    }
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  background: {
    backgroundColor: "#303030"
  },
  text: {
    color: "white"
  }
});

export default function Settings(props) {
  const classes = useStyles();
  const handleToggle = () => {
    props.setOpen(!props.open);
    window.location.reload();
  };

  return (
    <Dialog
      PaperProps={{
        classes: {
          root: classes.background
        }
      }}
      fullScreen
      open={props.open}
      onClose={handleToggle}
      TransitionComponent={Transition}
    >
      <ThemeProvider theme={theme}>
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
          style={{
            padding: "16px 10%",
            width: "inherit",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          spacing={4}
          xs={8}
        >
          <Grid item xs >
            <Typography className={classes.text} style={{ textAlign: "center" }}>
              {" "}
              Minimum/Maximum time (min) before spin
            </Typography>
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
          <Grid item xs  style={{ margin: "auto" }}>
            <Typography className={classes.text}>
              Max amt. of spinners
            </Typography>
            <Select
              error
              IconComponent={()=>(<LocalBarIcon style={{fill: "white"}}/>)}

              color="primary"
              style={{ marginLeft: "40px" }}
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
              inputProps={{
                classes: {
                  root: classes.text
                }
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </Grid>
          <Grid item xs>
            <NameChips
              css={classes}
              names={props.names}
              setNames={props.setNames}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Dialog>
  );
}
