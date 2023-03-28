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
 
} from "@material-ui/core"

import {
    SearchTwoToneIcon,
    MessageTwoToneIcon,
    WbSunnyTwoToneIcon,
    NightsStayTwoToneIcon,
    NotificationsActiveTwoToneIcon,
    Help,
    Menu,
    Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { useSelect } from "@mui/base";



const navbar = () => {
    const [isMoblieMenuToggle, setIsMobileMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    return(
        <div>
            <h1>Navbar</h1>
        </div>
    )
}

export default navbar