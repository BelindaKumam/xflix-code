//Filter + videos
import Grid from "@mui/material/Grid"
import Explore from "./Explore";
import GenreList from "./GenreList";
import ContentRating from "./ContentRating";
import { useEffect } from "react";


const Dashboard=({videoList, allGenres, selectedGenres, handleGenreChange, fetchVideos, allContentRatings, selectedContentRatings, handleContentRatingChange})=>{
    useEffect(()=>{
        fetchVideos()
    },[selectedGenres])
    return(
        <div>
            <Grid container>
              <GenreList
                handleGenreChange={handleGenreChange}
                selectedGenres={selectedGenres}
                allGenres={allGenres}
              />
              <ContentRating
              allContentRatings={allContentRatings}
              selectedContentRatings={selectedContentRatings}
              handleContentRatingChange={handleContentRatingChange}
              />
              <Grid item xs={12}>
                <Explore
                videoList={videoList} parent="Dashboard"
                />
              </Grid>
            </Grid>
        </div>
    )

}

export default Dashboard;