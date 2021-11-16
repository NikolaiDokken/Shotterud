import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CloseIcon from "@mui/icons-material/Close";

export default function TopBar({ prevNames, setPrevNames }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <LocalBarIcon sx={{ mr: 1 }} />
                <ArrowForwardIosIcon sx={{ mr: 1 }} />
                <Box
                    id="prev-names"
                    sx={{ display: "flex", flex: 1, alignItems: "center" }}
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
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setPrevNames([])}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
