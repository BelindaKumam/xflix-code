import { Box } from "@mui/material";
import React from "react";
import "./ContentRating.css";




const ContentRating=({ allContentRatings, selectedContentRatings, handleContentRatingChange, })=>{
 return(
    <div className="tool-bar" id="tool-barHeight">
     {allContentRatings.map((contentRating)=>(
        <Box
          key={contentRating.value}
          className={
            selectedContentRatings.includes(contentRating.value)
            ? "content-rating-btn active-toolbar-button"
            : "content-rating-btn"
          }
          onClick={()=> handleContentRatingChange(contentRating, selectedContentRatings)}
        >
         {contentRating.label}
        </Box>
     ))}
    </div>
 )
}

export default ContentRating;