import { useState } from "react"

import {
    Box,
    IconButton,
    InputBase,
    Typography,
    MenuItem,
    Select,
    FormControl,
    useTheme,
    useMediaQuery,
 
} from '@mui/material';

import {
    Search,
    // MessageTwoToneIcon,
    // WbSunnyTwoToneIcon,
    // NightsStayTwoToneIcon,
    // NotificationsActiveTwoToneIcon,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween"
import { useSelect } from "@mui/base";



const navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`
    return(
        <FlexBetween padding = "1rem 6%" backgroundColor = {alt}>
            <FlexBetween gap="1.75rem">
                <Typography fontWeight = "bold"
                            fontSize = "clamp(1.5rem, 2rem, 2.5rem)"
                            variant="h6"
                            color="Primary"
                            onClick={() => navigate("/home")}
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                    color: neutralLight
                                },
                            }}
                            >
                SocialLite
                {/*is  mobile screen navbar*/}
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween gap="3rem" backgroundColor={neutralLight} borderRadius="9px" padding = "0.1rem 1.5rem" >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                                {/* <Search /> */}
                        </IconButton>
                    </FlexBetween>  
                )}
            </FlexBetween>
            {/*is non mobile screen navbar*/}

            
        </FlexBetween>
    )
}

export default navbar
