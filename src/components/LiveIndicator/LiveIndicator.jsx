import { Box, CircularProgress, Typography } from "@mui/material";
import { themes } from "../../utils/themes";
import "./LiveIndicator.css";

export default function LiveIndicator({ settings }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {themes[settings.theme].indicatorImage ? (
                <img
                    className="liveIndicator"
                    src={themes[settings.theme].indicatorImage}
                    alt=""
                    style={{ height: "2em", width: "2em" }}
                />
            ) : (
                <CircularProgress size="2em" disableShrink />
            )}
            <Typography sx={{ ml: 2 }}>Game is live</Typography>
        </Box>
    );
}
