import { useState } from "react";

export const HandleInputForm = ({ handleSubmit }) => {
  const [searchType, setSearchType] = useState("videoId");

  const placeholders = {
    videoId: "Enter Video ID...",
    URL: "Enter URL..."
  };

  const handleOptionChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, searchType)} className="form">
      <span className="radioBoxOptions">
        <input
          type="radio"
          id="videoId"
          name="searchType"
          value="videoId"
          checked={searchType === 'videoId'}
          onChange={handleOptionChange} />
        <label htmlFor="videoId">Video ID</label>
        <input
          type="radio"
          id="url"
          name="searchType"
          value="url"
          checked={searchType === 'url'}
          onChange={handleOptionChange} />
        <label htmlFor="url">URL</label>
      </span>
      <div></div>
      <label>Enter {searchType === "videoId" ? "Video ID:" : "URL:"}</label>
      <input
        type="text"
        placeholder={searchType === "videoId" ? placeholders.videoId : placeholders.URL}
      />

      <button type="submit" className="alignment">
        Search
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
};