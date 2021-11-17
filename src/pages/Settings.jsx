import { useState } from "react";
import {
    Box,
    Fab,
    Slider,
    Typography,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    OutlinedInput,
    Chip,
    Button,
} from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

export default function Settings({ settings, setSettings, names, setNames }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [name, setName] = useState("");

    const handleChangeSettings = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleAddName = () => {
        setNames((prevState) => prevState.concat(name));
        setName("");
    };

    const handleDeleteName = (nameToDelete) => {
        setNames(names.filter((name) => name !== nameToDelete));
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            handleAddName();
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                color: theme.palette.getContrastText(
                    theme.palette.background.default
                ),
            }}
        >
            <Box
                sx={{
                    maxWidth: "100%",
                    width: "600px",
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Typography variant="h3" sx={{ mb: 4 }}>
                    Settings
                </Typography>
                <Typography>Minimum and Maximum Waiting Time</Typography>
                <Slider
                    name="minMaxMinutes"
                    value={settings.minMaxMinutes}
                    onChange={handleChangeSettings}
                    valueLabelDisplay="auto"
                    sx={{ mb: 2 }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography sx={{ flex: 1, textAlign: "left" }}>
                        Maximum number of spinners:{" "}
                    </Typography>
                    <Select
                        name="amtSpinners"
                        value={settings.amtSpinners}
                        label="Spinners"
                        onChange={handleChangeSettings}
                        variant="standard"
                    >
                        <MenuItem value={1}>One</MenuItem>
                        <MenuItem value={2}>Two</MenuItem>
                        <MenuItem value={3}>Three</MenuItem>
                        <MenuItem value={4}>Four</MenuItem>
                    </Select>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography sx={{ flex: 1, textAlign: "left" }}>
                        Add players:
                    </Typography>
                    <OutlinedInput
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleAddName}>
                                    <PersonAddIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
                <Box
                    sx={
                        names.length === 0
                            ? {
                                  display: "flex",
                                  border:
                                      "1px solid " +
                                      theme.palette.action.disabled,
                                  borderRadius: 1,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  minHeight: "100px",
                                  mb: 2,
                              }
                            : {
                                  border: "1px solid",
                                  borderRadius: 1,
                                  p: 1,
                                  textAlign: "left",
                                  minHeight: "100px",
                                  mb: 2,
                              }
                    }
                >
                    {names.length > 0 ? (
                        names.map((name, index) => (
                            <Chip
                                key={index}
                                label={name}
                                sx={{ mr: 1 }}
                                color="primary"
                                onDelete={() => handleDeleteName(name)}
                            />
                        ))
                    ) : (
                        <Typography variant="h4">No Players :(</Typography>
                    )}
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => setNames([])}
                >
                    Delete All
                </Button>
                <Fab
                    color="primary"
                    variant="extended"
                    aria-label="add"
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                    onClick={() => navigate("/")}
                >
                    <LocalBarIcon sx={{ mr: 1 }} />
                    Save and go back to game
                </Fab>
            </Box>
        </Box>
    );
}
