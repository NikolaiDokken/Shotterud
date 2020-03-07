import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Typography,
  Grid,
  AppBar,
  IconButton
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import CloseIcon from "@material-ui/icons/Close";
import Settings from "../Settings/Settings";
import Spinner from "./Spinner";
import "./Shotterud.css";
import $ from "jquery";

export default function Shotterud(props) {
  var storedNames = JSON.parse(sessionStorage.getItem("names"));
  var storedAmtSpinners = JSON.parse(sessionStorage.getItem("amtSpinners"));
  var storedMinMaxSec = JSON.parse(sessionStorage.getItem("minMaxSec"));
  const [names, setNames] = useState(storedNames !== null ? storedNames : []);
  const [settings, setSettings] = useState({
    amtSpinners: storedAmtSpinners !== null ? storedAmtSpinners : 1,
    minMaxSec: storedMinMaxSec !== null ? storedMinMaxSec : [10, 15]
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const randomTime = useCallback(
    callback => {
      return new Promise(resolve => {
        setTimeout(() => {
          callback();
          resolve();
        }, (Math.random() * (settings.minMaxSec[1] * 60 - settings.minMaxSec[0] * 60) + settings.minMaxSec[0] * 60) * 1000);
      });
    },
    [settings.minMaxSec]
  );

  const spinnerGenerator = useCallback(() => {
    var percentage = Math.random() * 101;
    var doubleSpin = percentage > 80 && settings.amtSpinners >= 2;
    var trippleSpin = percentage > 92 && settings.amtSpinners >= 3;
    var quadroupleSpin = percentage > 96 && settings.amtSpinners >= 4;
    var amt = 1;
    if (quadroupleSpin) amt = 4;
    else if (trippleSpin) amt = 3;
    else if (doubleSpin) amt = 2;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        style={{ height: "100%" }}
        spacing={4}
      >
        {Array(amt)
          .fill()
          .map((spinner, index) => (
            <Grid item>
              <Spinner names={names} nr={index} />
            </Grid>
          ))}
      </Grid>
    );
  }, [names, settings]);

  const start = useCallback(
    async function() {
      while (true) {
        await randomTime(() => {
          if (names.length > 1) {
            ReactDOM.render(
              spinnerGenerator(),
              document.getElementById("spinners")
            );
            setTimeout(() => {
              ReactDOM.render("", document.getElementById("spinners"));
            }, 25000);
          }
        });
      }
    },
    [names, randomTime, spinnerGenerator]
  );

  useEffect(() => {
    start();
    var storedPrevNames = JSON.parse(sessionStorage.getItem("prevNames"));
    if (storedPrevNames !== null) {
      storedPrevNames.map(name => {
        $("#prev-names").append(
          "<p style=" +
            "color:#ff3d42;font-size:24px;font-family:arial;text-transform:uppercase;border-left:groove;border-color:#ff3d42;padding-right:15px;padding-left:15px;margin-top:0px;margin-bottom:0px;" +
            ">" +
            name +
            "</p>"
        );
        return null;
      });
    }
  }, [start]);

  return (
    <div>
      <AppBar id="AppBar">
        <Grid
          container
          direction="column"
          justify="center"
          style={{ height: "100%" }}
        >
          <Grid item container direction="row" justify="flex-end">
            <div className="hideScrollBar" id="prev-names"></div>
            <div style={{ position: "absolute", right: "0", top: "0" }}>
              <ArrowBack />
              <LocalBarIcon />
            </div>
            <div style={{ position: "absolute", left: "0", top: "0" }}>
              <IconButton
                size="small"
                onClick={() => {
                  $("#prev-names").empty();
                  window.sessionStorage.setItem(
                    "prevNames",
                    JSON.stringify([])
                  );
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </AppBar>
      {names.length < 2 ? (
        <h1 className="header-text" style={{ marginTop: "40px" }}>
          Velkommen til <br /> SHOTTERUD
        </h1>
      ) : (
        <h1 className="header-text" style={{ marginTop: "40px" }}>
          SHOTTERUD
        </h1>
      )}
      <div
        id="spinners"
        style={{ height: "100%", width: "100%", position: "absolute" }}
      ></div>
      {names.length < 2 ? (
        <Grid
          container
          direction="row"
          justify="center"
          style={{ marginTop: "100px" }}
        >
          <Typography
            className="infoText"
            variant="h5"
            style={{ textTransform: "uppercase" }}
          >
            Add more than 1 player
          </Typography>
        </Grid>
      ) : null}
      <Grid
        container
        justify="center"
        style={{
          position: "absolute",
          bottom: "6px",
          width: "100%"
        }}
      >
        <Button
          onClick={() => setSettingsOpen(true)}
          style={{ color: "#ff3d42", fontSize: "24px" }}
        >
          Settings
        </Button>
      </Grid>

      <Settings
        open={settingsOpen}
        setOpen={setSettingsOpen}
        names={names}
        setNames={setNames}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
}
