import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css';
import Home from "./components/Home";
import VideoPageView from "./components/VideoPageView"


// export const endpoint="https://3fdc74af-99fd-435a-b9b7-996040201d8e.mock.pstmn.io/v1/videos"

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
        <Routes>
          
          <Route exact path="/" element={<Home />}>
          
          <Route path="video/:id" element={<VideoPageView />}/>
            </Route>
          
        </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
