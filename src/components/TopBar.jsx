import { AppBar, Toolbar, Typography, Box, Button, Select, MenuItem } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import ClearIcon from "@mui/icons-material/Clear";
import { themes } from "../utils/themes";

export default function TopBar({ prevNames, setPrevNames, settings, setSettings }) {
    return (
        <AppBar position="sticky" id="topBar">
            <Toolbar>
                <LocalBarIcon sx={{ mr: 1 }} />
                <ArrowForwardIosIcon sx={{ mr: 1 }} />
                <Box
                    id="prev-names"
                    sx={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        overflowX: "auto",
                    }}
                >
                    {prevNames.map((name, index) =>
                        index !== 0 ? (
                            <Box key={index} sx={{ display: "flex" }}>
                                <Box
                                    sx={{
                                        width: 2,
                                        minHeight: "100%",
                                        bgcolor: "white",
                                        ml: 1,
                                        mr: 1,
                                    }}
                                />
                                <Typography>{name}</Typography>
                            </Box>
                        ) : (
                            <Typography key={index}>{name}</Typography>
                        )
                    )}
                </Box>
                {prevNames.length > 0 && (
                    <Button startIcon={<ClearIcon />} color="inherit" onClick={() => setPrevNames([])}>
                        Clear
                    </Button>
                )}
                <Select
                    name="theme"
                    value={settings.theme}
                    onChange={(e) => {
                        setSettings({ ...settings, theme: e.target.value });
                        window.location.reload();
                    }}
                    size="small"
                    sx={{
                        ml: 2,
                    }}
                >
                    {Object.keys(themes).map((themeKey, index) => (
                        <MenuItem key={index} value={themeKey}>
                            {themes[themeKey].name}
                        </MenuItem>
                    ))}
                </Select>
            </Toolbar>
        </AppBar>
    );
}
