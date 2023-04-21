import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useState } from "react";
import axios from "axios"
import { useSnackbar } from "notistack";
import "./Home.css";
import { endpoint } from "../App";




const GenreList=({allGenres, selectedGenres, handleGenreChange,setVideoList})=>{
  const {enqueueSnackBar}= useSnackbar();
  const sort={
    sortBy: "releaseDate",
  };
  const [option, setOption]=useState(sort);

  const handleInput=async(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setOption({...option, [name]: value });

    let URL=endpoint + `?sortBy=${value}`;
    if(value==="releaseDate"){
      URL=endpoint;
    }
    console.log(`Fetch called with ${value}:`, URL);
    try{
      const response=await axios.get(URL);
      const data=response.data.videos;
      setVideoList(data);
    }catch(e){
      if(e.response){
        enqueueSnackBar(e.response.data.message, { variant: "error"});
    } else {
            enqueueSnackBar(
                "Something went wrong. Check if the backend is running, reachable and returns valid JSON.",
                { variant: "error"}
            )
       }
    }
  }

 return(
    <div className="tool-bar">
        {allGenres.map((genre)=>(
            <Box
              onClick={()=>handleGenreChange(genre)}
              className={
                selectedGenres.includes(genre.value)
                ? "genre-btn active-toolbar-button"
                : "genre-btn"
              }
              key={genre.value}
              > 
              {genre.label}
              </Box>
        ))}

        <Box className="sort-by active-tool-button">
          <Stack direction="row" spacing={1}>
            <CompareArrowsIcon/>
            <span>Sort By:</span>
            <select
               className="sort-select"
               name="sortBy"
               value={option.sortBy}
               onChange={handleInput}
            >
              <option
                className="select-option"
                id="release-date-option"
                value="releaseDate"
              >
                Release Date
              </option>
              <option
                className="select-option"
                id="release-date-option"
                value="viewCount"
              >
                View Count
              </option>
            </select>
          </Stack>
        </Box>
    </div>
 )
}

export default GenreList;