import { Box, Fab } from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const navigate = useNavigate();
    return (
        <Box>
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
    );
}
