import React, { useState } from "react";
import { Dialog, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css"
import UploadForm from "./UploadForm"


const Header =({children, fetchVideos, genres, contentRatings})=>{
  const [isModalOpen, setIsModalOpen]=useState(false);

  const handleOpen=()=>{
    setIsModalOpen(true);
  };

  const handleClose=()=>{
    setIsModalOpen(false);
  };

    return(
        <>
        <Box
         display="flex"
         flexWrap="wrap"
         justifyContent="space-between" 
         alignItems="center" 
         sx={{paddingX:"1rem"}}
        >
         {/* The Logo */}
         <Box className="header-title" marginTop="1rem">
            <Link to="/" style={{ textDecoration: "none"}}>
                <b>
                    <p>
                        <span style={{color: "red"}}>X</span>
                        <span style={{color: "white"}}>Flix</span>
                    </p>
                </b>
            </Link>
         </Box>
         {/* Search bar */}
         <Box className="search-box" marginTop="1rem">
            {children}
         </Box>
         {/* Upload button */}
         <Box className="header-action" marginTop="1rem">
            <Button
              id="upload-btn"
              startIcon={<UploadIcon/>}
              variant="contained"
              onClick={handleOpen}
            >
               Upload
            </Button>
         </Box>
        </Box>

         <Dialog
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
         >
            <Grid container className="dialog">
                <Box 
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  alignItems="center"
                >
                    <h3 className="form-header">
                        Upload Video
                    </h3>
                    <IconButton
                     aria-label="close"
                     className={"close-button"}
                     onClick={handleClose}
                    >
                      <CloseIcon/>
                    </IconButton>
                </Box>
               <Grid item xs={12}>
                <UploadForm
                  onClose={handleClose}
                  fetchVideos={fetchVideos}
                  genres={genres}
                  contentRatings={contentRatings}
                />
               </Grid>
            </Grid>
         </Dialog>
        </>
    )
}

export default Header