import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { Button } from "@material-ui/core";
import Settings from "../Settings/Settings";
import Spinner from "./Spinner";

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

  const s = useCallback(
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

  const start = useCallback(
    async function() {
      while (true) {
        await s(() => {
          console.log("Halla");
          ReactDOM.render(
            <Spinner names={names} nr={1} />,
            document.getElementById("spinners")
          );
          setTimeout(() => {
            ReactDOM.render("", document.getElementById("spinners"));
          }, 25000);
        });
      }
    },
    [names, s]
  );

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div>
      <Button variant="outlined" onClick={() => setSettingsOpen(true)}>
        Settings
      </Button>
      <div id="spinners"></div>

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
