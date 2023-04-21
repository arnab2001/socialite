import {Box, Typography, useTheme , useMediaQuery} from "@mui/material";
import Form from "./Form";
import { color } from "framer-motion";
import Navbar from "scenes/navbar";
const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Navbar/> 
    <Box 
    sx={{
       textAlign:"center",
        
       
    }}
    >
    <Box 
    width="100%"
    backgroundcolor={theme.palette.primary.alt}
    p="1rem"
    textAlign="center"       
    >
      <Typography 
       fontWeight= "bold"
       color= "primary"
       fontSize="clamp(2rem, 5vw, 5rem)"
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
          transition: "all 500ms ease-in-out",

          cursor: "pointer",
        },
      }}
      
      >Socialite</Typography>
    </Box>
    
    {theme.palette.mode === "dark" ? (
    <Box 
      width={isMobile ? "50%" : "100%"}
      padding="2rem 6%"
      margin="2m"
      content = "center"
      textAlign="center" 
      maxWidth="800px"
      sx={
        {
          margin:"auto",
          marginTop:"2rem",
          marginBottom:"2rem",
          borderRadius:"2rem",
          boxShadow:"0 -2px 10px rgba(0, 0, 225, 225);",
          backgroundcolor: "primary",
          color: "white",
          "&:hover": {
            boxShadow: "0 0 10px 0 rgb(255,255,255)	",
            transition: "all 500ms ease-in-out",
          },
        }
      }
      >
      <Typography color="teal" fontWeight="500" variant="h5" mt={2} sx={{mb:"1.5rem"}}>
      
        Socialite , a social media app for idk  who 
      </Typography>
      <Form/>
      </Box>
    ) : (
      <Box 
      width={isMobile ? "50%" : "100%"}
      padding="2rem 6%"
      margin="2m"
      content = "center"
      textAlign="center" 
      maxWidth="800px"
      sx={
        {
          margin:"auto",
          marginTop:"2rem",
          marginBottom:"2rem",
          borderRadius:"2rem",
          boxShadow:"0 0 10px 0 rgba(0,0,0,0.2)",
          backgroundcolor: "primary",
          color: "white",
          "&:hover": {
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            transition: "all 500ms ease-in-out",
          },
        }
      }
      >
      <Typography color="teal" fontWeight="500" variant="h5" mt={2} sx={{mb:"1.5rem"}}>
      
        Socialite , a social media app for idk  who 
      </Typography>
      <Form/>
      </Box>
      
    )}
    </Box>
    </>
  );
}
export default LoginPage;