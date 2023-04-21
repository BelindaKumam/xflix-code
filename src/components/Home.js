import React, { useEffect, useState } from "react";
import './Home.css';
import Dashboard from "./Dashboard";
import { useSnackbar } from "notistack";
import axios from "axios";
import { endpoint } from "../App";
import { InputAdornment, TextField, CircularProgress, Grid, Stack, Button } from "@mui/material";
// import ContentRating from "./ContentRating"
import { Box } from "@mui/material";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import VideoCard from "./VideoCard";





const Home=()=>{
  const allGenres =[
    { label: "All", value: "All"},
    { label: "Education", value: "Education"},
    { label: "Sports", value: "Sports"},
    { label: "Comedy", value: "Comedy"},
    { label: "Lifestyles", value: "Lifestyles"},
    { label: "Movies", value: "Movies"}
   
  ];

  const allContentRatings =[
    { label: "All Age Group", value: "Anyone"},
    { label: "7+", value: "7+"},
    { label: "12+", value: "12+"},
    { label: "16+", value: "16+"},
    { label: "18+", value: "18+"}
  ]

  const [videoList, setVideoList]=useState([]);
  const [genres, setGenres]=useState(["All"]); 
  const { enqueueSnackBar }=useSnackbar();
  const [selectedContentRatings, setSelectedContentRating]=useState("Anyone");
  const [isLoading, setLoading]=useState(false);
  const [timeId, setTimerId]=useState(null);
  const [searchValid, setIfSearchValid] = useState("true");

  const handleGenreChange=(genre)=>{
   const all="All";
   const newGenreValue=genre.value;
   if(newGenreValue===all){
    setGenres([all]);
   } else {
    const genresWithoutAll=genres.filter((ele)=> ele !== all);
    let nextGenres;
    if(genresWithoutAll.includes(newGenreValue)){
    nextGenres=genresWithoutAll.filter((ele)=> ele!==newGenreValue)
    } else {
        nextGenres=[...genresWithoutAll, newGenreValue]
    }
    if (nextGenres.length===0){
        setGenres([all]);
    } else {
        setGenres(nextGenres)
    }
   }
  };
  
  const handleContentRatingChange=(contentRating)=>{
      // const anyone="Anyone";
      // const newContentValue=contentRating.value;
      // if(newContentValue===anyone){
      //   setSelectedContentRating([anyone])
      // } else {
      //   const contentWithoutAnyone=contentRating.filter((ele)=> ele !== anyone)
      //   let nextContentrating;
      //   if(contentWithoutAnyone.includes(newContentValue)){
      //     nextContentrating=contentWithoutAnyone.filter((ele)=> ele!==newContentValue)
      //   } else {
      //     nextContentrating=[...contentWithoutAnyone, newContentValue]
      //   }
      //   if (nextContentrating.length===0){
      //     setSelectedContentRating([anyone])
      //   } else {
      //     setSelectedContentRating(nextContentrating)
      //   }
      // }
    }
// + `?genres=${genres.join(",")}`
  const perfromAPICall=async()=>{
    const URL=endpoint ;
    console.log("Fetch Called with", URL)
    try{
      const response=await axios.get(URL);
      const videos=response.data.videos;
      setVideoList(videos)
      return videos
    } catch(e){
        if (e.response){
            enqueueSnackBar(e.response.data.message, { variant: "error"});
        } else {
                enqueueSnackBar(
                    "Something went wrong. Check if the backend is running, reachable and returns valid JSON.",
                    { variant: "error"}
                );
            }
        }
        return [];
       
    }

    const performSearch=async(value, genres, selectedContentRatings)=>{
      let URL=endpoint;
      if(value.length){
        URL +=`title=${value}`
      }
      if(genres.length){
        if(genres.length && !genres.includes("All")){
          const param = genres.join(",");
          URL[URL.length-1]==="?"
          ? (URL +=`genres=${param}`)
          : (URL +=`&genres=${param}`)
        }
      }
      if(selectedContentRatings.length && selectedContentRatings !== "Anyone"){
        URL[URL.length -1 ]==="?"
        ? (URL +=`contentRating=${selectedContentRatings}`)
        : (URL +=`&contentRating=${selectedContentRatings}`);
      }
      perfromAPICall(URL);
    }

    const debounceSearch = (e, debounceTimeout)=>{
      const value= e.target.value;
      if(timeId){
        clearTimeout(timeId);
      }
      const debounceTimeoutId=setTimeout(
        ()=> performSearch(value, genres, selectedContentRatings),
        debounceTimeout
      );
      setTimerId(debounceTimeoutId)
    }

    

    useEffect(()=>{
      performSearch("", genres, selectedContentRatings);
    },[genres, selectedContentRatings])

    return(
        <div>
          <Box className="header=box" sx={{ height: "10vh", bgcolor: "#202020"}}>
              <Header
                 fetchVideos={perfromAPICall}
                 genres={allGenres}
                 contentRating={allContentRatings}
               >

                <TextField
                  className="search-desktop"
                  small="small"
                  inputProps={{ style: {fontFamily: "Arial", color: "white"}}}
                  InputProps={{
                  className: "search",
                   endAdornment: (
                     <InputAdornment position="end">
                       <Search color="primary"/>
                     </InputAdornment>
                   ),
                  }}
                 placeholder="Search"
                 name="search"
                onChange={(event)=> debounceSearch(event, 500)}
                />
            </Header>
          </Box>

          <TextField
             className="search-mobile"
             size="small"
             fullWidth
             inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
             InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                    <Search color="primary" />
                  </InputAdornment>
               ),
             }}
            onChange={(event) => debounceSearch(event, 500)}
            placeholder="Search"
            name="search"
          />

            <Dashboard
                videoList={videoList}
                allGenres={allGenres}
                selectedGenres={genres}
                handleGenreChange={handleGenreChange}
                allContentRatings={allContentRatings}
                selectedContentRatings={selectedContentRatings}
                handleContentRatingChange={handleContentRatingChange}
                fetchVideos={perfromAPICall}
            />
            {/* <ContentRating
                allContentRatings={allContentRatings}
                selectedContentRatings={selectedContentRatings}
                handleContentRatingChange={handleContentRatingChange}
            /> */}

            {searchValid ? (
              <Grid
                  container
                  paddingY="1rem"
                  marginTop="0.6rem"
                  paddingX="2rem"
                  spacing={3}
               >
              {!isLoading ? (
                videoList.map((video)=>(
                  <Grid item xs={12} sm={6} md={3} key={video._id}>
                    <Link
                      to={`/video/${video._id}`}
                      className="video-tile-link"
                      style={{ textDecoration: "none", color: "white"}}
                      >
                        <VideoCard video={video}/>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "75vh", width: "100%" }}
                 >
                  <Box>
                    <CircularProgress />
                     <p>Loading Videos...</p> 
                 </Box>
                </Box>
              )}
            </Grid>
              ): (
              <Box className="loading">
                   <SentimentDissatisfied />
                  <p>No videos found</p>
              </Box>
            )}
        </div>
    )
}

export default Home