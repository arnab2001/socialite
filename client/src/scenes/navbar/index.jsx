import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Search,
  MessageTwoTone as Message,
  DarkMode,
  LightModeTwoTone as LightMode,
  NotificationsSharp as Notifications,
  Help,
  Menu,
  Close,
  Logout,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { motion } from "framer-motion";

const Navbar = () => {
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

  // const fullName = `${user?.firstName} ${user?.lastName}`;
  const fullName = "Arnab Chatterjee";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            backgroundcolor: "primary",
            backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            "&:hover": {
              backgroundcolor: "primary",
              backgroundImage: `linear-gradient(180deg, #5514B4, #FF80FF)`,
              backgroundSize: "50%",
              backgroundRepeat: "repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",

              cursor: "pointer",
            },
          }}
        >
          SociaLite
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ rotate: 360, duration: 0.4 }}
              >
                <DarkMode sx={{ fontSize: "25px", color: "#816ecc" }} />
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 0.4 }}
              >
                <LightMode
                  sx={{
                    color: "#FFBF71",
                    fontSize: "25px",
                  }}
                />
              </motion.div>
            )}
          </IconButton>
          <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            {" "}
            <Message sx={{ fontSize: "25px", color: " #5514B4" }} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            {" "}
            <Notifications sx={{ fontSize: "25px", color: "#FF80FF" }} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Help sx={{ fontSize: "25px" }} />
          </motion.a>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "200px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="200px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem" >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
            border="1px black"
            
          >
            <Typography
              fontWeight="bold"
              fontSize="clamp(0.5rem, 1rem, 1rem)"
              color="primary"
              onClick={() => navigate("/home")}
              sx={{
                backgroundcolor: "primary",
                backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
                backgroundSize: "100%",
                backgroundRepeat: "repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                borderBottom:"1px solid #423966",
                "&:hover": {
                  backgroundcolor: "primary",
                  backgroundImage: `linear-gradient(180deg, #5514B4, #FF80FF)`,
                  backgroundSize: "50%",
                  backgroundRepeat: "repeat",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transition: "all 500ms ease-in-out",

                  cursor: "pointer",
                },
              }}
            >
              {fullName}
            </Typography>
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px", }}
              
            >
              {theme.palette.mode === "dark" ? (
                <IconButton>
                  {" "}
                  <DarkMode sx={{ color: "#423966" }} />
                  <Typography
                    sx={{
                      color: "#816ecc",
                      fontWeight: 500,
                    }}
                  >
                    {" "}
                    Dark Mode
                  </Typography>
                </IconButton>
              ) : (
                <IconButton>
                  <LightMode sx={{ color: "#FFBF71" }} />
                  <Typography
                    sx={{
                      color: "#FFBF71",

                      transition: "all 500ms ease-in-out",
                    }}
                  >
                    Light Mode
                  </Typography>
                </IconButton>
              )}
            </IconButton>

            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              {" "}
              <IconButton>
                <Message sx={{ color: " #5514B4" }} />
                <Typography
                  sx={{
                    color: "#5514B4",
                  }}
                >
                  Messages
                </Typography>
              </IconButton>
            </motion.a>
            
            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><IconButton>
            <Notifications sx={{color:"#FF80FF"}}  /><Typography sx={{ color: "#28188f" }}>Notifications</Typography>
            </IconButton>
            </motion.a>

            
            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <IconButton> <Help sx={{ fontSize: "25px" , color : "black" }} /><Typography sx={{ color: "grey" }}>Help</Typography>
            </IconButton></motion.a>

            <FormControl variant="standard" value={fullName}>
              {/* <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem> */}
              {/* </Select> */}
              <Logout onClick={() => dispatch(setLogout())} />
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
