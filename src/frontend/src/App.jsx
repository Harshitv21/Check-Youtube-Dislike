import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/App.css";
import { Header } from "./components/Header";
import { APILimitAndInfo } from "./components/APILimitAndInfo";
import { CurrentTimeAndDate } from "./components/CurrentTimeAndDate";
import { TimeOfGeneration } from "./components/TimeOfGeneration";
import { Error } from "./components/Error";
import { Footer } from "./components/Footer";
import { DownloadJSONData } from "./components/DownloadJSONData";
import { RecievedData } from "./components/RecievedData";
import { HandleInputForm } from "./components/HandleInputForm";

const SERVER_PORT = 5001;

function App() {
  const [dislikes, setDislikes] = useState(0);
  const [likes, setLikes] = useState(0);
  const [rating, setRating] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [dateCreated, setDateCreated] = useState("");
  const [id, setId] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [fetchedTime, setFetchedTime] = useState("");
  const [ytTitle, setYtTitle] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [jsonData, setJsonData] = useState({});

  const fetchData = async (videoId) => {
    setError(false);
    try {
      let passedTime = new Date().toLocaleTimeString("en-IN", { hour12: true });
      let passedDate = new Date().toLocaleDateString("en-IN");
      console.log(passedDate, passedTime);
      const getData = await axios.get(
        `http://localhost:${SERVER_PORT}/dislike?videoId=${videoId}&passedDate=${passedDate}&passedTime=${passedTime}`
      );
      const { id, dateCreated, likes, dislikes, rating, viewCount, deleted } =
        getData.data;
      setDislikes(dislikes);
      setLikes(likes);
      setRating(rating);
      setDateCreated(dateCreated);
      setDeleted(deleted);
      setViewCount(viewCount);
      setId(id);
    } catch (e) {
      setError(true);
    }
  };

  const scrapData = async (videoId) => {
    try {
      const fetchedData = await axios.get(
        `http://localhost:${SERVER_PORT}/scrap-data?videoId=${videoId}`
      );
      const {
        title,
        url,
        videoLink,
        videoAltLink,
        descriptionShort,
        description,
        author,
        channelId,
        isCrawlable,
        isLiveContent,
        keywords,
        lengthSeconds,
        thumbnail,
      } = fetchedData.data;
      setYtTitle(title);
      setThumbnailUrl(url);

      let descriptionShortLength = descriptionShort.split(/\s+/).length;
      let collapsed = descriptionShortLength;

      const jsonData = {
        videoId,
        title,
        url,
        videoLink,
        videoAltLink,
        descriptionShort,
        description,
        author,
        channelId,
        isCrawlable,
        isLiveContent,
        keywords,
        lengthSeconds,
        thumbnail,
        collapsed,
      };
      setJsonData(jsonData);
    } catch (e) {
      console.log("Error ☹️: ", e.message);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchData(videoId);
      scrapData(videoId);
    }
  }, [videoId]);

  const handleSubmit = (e, searchType) => {
    e.preventDefault();
    setFetchedTime(currentTime);
    let inputValue = e.target.querySelector('input[type="text"]').value;
    if (searchType === "videoId") {
      setVideoId(inputValue);
    } else {
      /* 
      Formats in which a youtube link could be passed -
      https://youtu.be/videoId
      https://youtu.be/videoId?t=duration
      https://youtu.be/videoId?si=????
      https://www.youtube.com/watch?v=videoId&ab_channel=channelName
      */
      // i really don't know how this works its just copy pasta from chatGPT 🥲
      const videoIdMatch = inputValue.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/.*&v=))([^\/&?]{11})/
      );
      // one match will be found and we want that only
      if (videoIdMatch && videoIdMatch[1]) {
        setVideoId(videoIdMatch[1]);
      } else {
        setVideoId("null");
      }
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <CurrentTimeAndDate
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      />
      <APILimitAndInfo />
      <HandleInputForm handleSubmit={handleSubmit} />
      <div className="apiAndYT">
        {!error ? (
          <>
            <TimeOfGeneration fetchedTime={fetchedTime} />
            <div className="innerApiAndYT">
              <RecievedData
                id={id}
                likes={likes}
                dislikes={dislikes}
                rating={rating}
                viewCount={viewCount}
                dateCreated={dateCreated}
                deleted={deleted}
                jsonData={jsonData}
                ytTitle={ytTitle}
                thumbnailUrl={thumbnailUrl}
              />
            </div>
          </>
        ) : (
          <>
            <TimeOfGeneration fetchedTime={fetchedTime} />
            <Error />
          </>
        )}
      </div>
      <DownloadJSONData jsonData={jsonData} />
      <Footer />
    </>
  );
}

export default App;
