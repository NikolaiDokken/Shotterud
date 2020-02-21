import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Settings from "../Settings/Settings";

export default function Shotterud(props) {
  const [names, setNames] = useState([]);
  const [settings, setSettings] = useState({
    amtSpinners: 1,
    minMaxSec: [10, 15]
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => setSettingsOpen(true)}>
        Settings
      </Button>
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
