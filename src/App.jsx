import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import SpinnerPage from "./pages/SpinnerPage";
import Settings from "./pages/Settings";
import { Routes, Route, BrowserRouter } from "react-router";
import { writeToSessionStorage, readFromSessionStorage } from "./utils/utils";
import { themes } from "./utils/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

const DEFAULT_SETTINGS = {
    amtSpinners: 1,
    minMaxMinutes: [15, 30],
    theme: "default",
};

function App() {
    // Names and settings are restored from sessionStorage so they survive a reload
    const [names, setNames] = useState(() => JSON.parse(readFromSessionStorage("names")) ?? []);
    const [prevNames, setPrevNames] = useState([]);
    const [settings, setSettings] = useState(
        () => JSON.parse(readFromSessionStorage("settings")) ?? DEFAULT_SETTINGS
    );

    useEffect(() => {
        writeToSessionStorage("names", JSON.stringify(names));
    }, [names]);

    useEffect(() => {
        writeToSessionStorage("settings", JSON.stringify(settings));
    }, [settings]);

    return (
        <Box id="app" sx={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh" }}>
            <ThemeProvider theme={createTheme(themes[settings.theme])}>
                <CssBaseline />
                <TopBar
                    prevNames={prevNames}
                    setPrevNames={setPrevNames}
                    settings={settings}
                    setSettings={setSettings}
                />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<SpinnerPage names={names} settings={settings} setPrevNames={setPrevNames} />}
                        />
                        <Route
                            path="/settings"
                            element={
                                <Settings
                                    settings={settings}
                                    setSettings={setSettings}
                                    names={names}
                                    setNames={setNames}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Box>
    );
}

export default App;
