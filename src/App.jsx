import { useEffect, useMemo, useState } from "react";
import TopBar from "./components/TopBar";
import SpinnerPage from "./pages/SpinnerPage";
import Settings from "./pages/Settings";
import { Routes, Route, BrowserRouter } from "react-router";
import { loadFromSessionStorage, saveToSessionStorage } from "./utils/utils";
import { themes } from "./utils/themes";
import { getThemeStyle } from "./utils/themeStyle";

const DEFAULT_SETTINGS = {
    amtSpinners: 1,
    minMaxMinutes: [15, 30],
    theme: "default",
};

function App() {
    // Names and settings are restored from sessionStorage so they survive a reload
    const [names, setNames] = useState(() => loadFromSessionStorage("names", []));
    const [prevNames, setPrevNames] = useState([]);
    const [settings, setSettings] = useState(() => {
        const storedSettings = { ...DEFAULT_SETTINGS, ...loadFromSessionStorage("settings", {}) };
        // A stored theme may have been renamed or removed since it was saved
        return themes[storedSettings.theme] ? storedSettings : { ...storedSettings, theme: DEFAULT_SETTINGS.theme };
    });
    const themeStyle = useMemo(() => getThemeStyle(themes[settings.theme]), [settings.theme]);

    useEffect(() => {
        saveToSessionStorage("names", names);
    }, [names]);

    useEffect(() => {
        saveToSessionStorage("settings", settings);
    }, [settings]);

    return (
        <div className="app" style={themeStyle}>
            <TopBar prevNames={prevNames} setPrevNames={setPrevNames} />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<SpinnerPage names={names} settings={settings} setPrevNames={setPrevNames} />}
                    />
                    <Route
                        path="/settings"
                        element={
                            <Settings settings={settings} setSettings={setSettings} names={names} setNames={setNames} />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
