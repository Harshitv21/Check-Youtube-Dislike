import { useState, useEffect } from "react";
import { DisplayYTData } from "./DisplayYTData";

export const RecievedData = ({
  id,
  likes,
  dislikes,
  rating,
  viewCount,
  dateCreated,
  deleted,
  jsonData,
  ytTitle,
  thumbnailUrl,
}) => {
  let expanded = false;
  const [isExpanded, setIsExpanded] = useState(expanded);
  let expandButtonText = "Show more";
  let collapseButtonText = "Show less";

  /* formats = plain, abbreviated, percentage */
  // likes
  const [formatedLikes, setFormatedLikes] = useState("");
  const [currentFormatLikes, setCurrentFormatLikes] = useState(0);
  // dislikes
  const [formatedDislikes, setFormatedDislikes] = useState("");
  const [currentFormatDislikes, setCurrentFormatDislikes] = useState(0);
  // views
  const [formattedViews, setFormattedViews] = useState("");
  const [currentFormatViews, setCurrentFormatViews] = useState(0);
  // length
  const [formattedLength, setFormattedLength] = useState(0);
  const [currentFormatLength, setCurrentFormatLength] = useState(0);

  /* */
  const switchFormatLikes = () => {
    setCurrentFormatLikes((currentFormatLikes + 1) % 3);
  };

  const switchFormatDislikes = () => {
    setCurrentFormatDislikes((currentFormatDislikes + 1) % 3);
  };

  useEffect(() => {
    const formatLikesAndDislikes = (input, format) => {
      if (format === 0) {
        return input.toString();
      } else if (format === 1) {
        let abbreviatedNum = "";
        if (input >= 1000000000) {
          abbreviatedNum = (input / 1000000000).toFixed(1) + "B";
        } else if (input >= 1000000) {
          abbreviatedNum = (input / 1000000).toFixed(1) + "M";
        } else if (input >= 1000) {
          abbreviatedNum = (input / 1000).toFixed(1) + "K";
        } else {
          abbreviatedNum = input.toString();
        }
        return abbreviatedNum;
      } else {
        let percentageNum = "";
        if (likes + dislikes !== 0) {
          percentageNum = ((input / (likes + dislikes)) * 100).toFixed(2) + "%";
        } else {
          percentageNum = "N/A";
        }
        return percentageNum;
      }
    };

    // Update formatedLikes when likes prop changes
    setFormatedLikes(formatLikesAndDislikes(likes, currentFormatLikes));
    // Update formatedDislikes when likes prop changes
    setFormatedDislikes(
      formatLikesAndDislikes(dislikes, currentFormatDislikes)
    );
  }, [likes, dislikes, currentFormatLikes, currentFormatDislikes]);

  /* */
  const switchFormatLength = () => {
    setCurrentFormatLength((currentFormatLength + 1) % 3);
  };

  useEffect(() => {
    const formatLength = (input, format) => {
      if (input === undefined) {
        return 0;
      } else {
        if (format === 0) {
          return input;
        } else if (format === 1) {
          const hours = Math.floor(input / 3600);
          const remainingMinutes = input % 60;

          return { hours, remainingMinutes };
        } else {
          const onlyHours = input / 3600;
          return onlyHours.toFixed(2);
        }
      }
    };

    setFormattedLength(
      formatLength(jsonData.lengthSeconds, currentFormatLength)
    );
  }, [jsonData.lengthSeconds, currentFormatLength]);

  /* */
  const switchFormatViews = () => {
    setCurrentFormatViews((currentFormatViews + 1) % 2);
  };

  useEffect(() => {
    const formatViews = (views, format) => {
      if (format === 0) {
        return views.toLocaleString();
      } else if (format === 1) {
        let abbreviatedNum = "";
        if (views >= 1000000000) {
          abbreviatedNum = (views / 1000000000).toFixed(1) + "B";
        } else if (views >= 1000000) {
          abbreviatedNum = (views / 1000000).toFixed(1) + "M";
        } else if (views >= 1000) {
          abbreviatedNum = (views / 1000).toFixed(1) + "K";
        } else {
          abbreviatedNum = views.toLocaleString();
        }
        return abbreviatedNum;
      }
    };

    setFormattedViews(formatViews(viewCount, currentFormatViews));
  }, [viewCount, currentFormatViews]);

  return (
    <>
      <div className="apiData">
        <table className="table">
          <tbody>
            <tr>
              <th>Properties</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>ID</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>Likes</td>
              <td>
                {formatedLikes}{" "}
                <button
                  className="switchButton"
                  onClick={() => switchFormatLikes()}
                >
                  Switch Format
                </button>
              </td>
            </tr>
            <tr>
              <td>Dislikes</td>
              <td>
                {formatedDislikes}{" "}
                <button
                  className="switchButton"
                  onClick={() => switchFormatDislikes()}
                >
                  Switch Format
                </button>
              </td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{rating}</td>
            </tr>
            <tr>
              <td>Video uploaded on</td>
              <td>{dateCreated}</td>
            </tr>
            <tr>
              <td>Views</td>
              <td>
                {formattedViews}{" "}
                <button
                  className="switchButton"
                  onClick={() => switchFormatViews()}
                >
                  Switch Format
                </button>
              </td>
            </tr>
            <tr>
              <td>Is video deleted</td>
              <td>{deleted ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
        <table className="table">
          <tbody>
            {Object.keys(jsonData).length === 0 ? (
              <tr>
                <th>No Youtube Data Found ☹️</th>
                <th></th>
              </tr>
            ) : (
              <>
                <tr>
                  <td>Data Recieved ✨</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Channel</td>
                  <td>{jsonData.author}</td>
                </tr>
                <tr>
                  <td>Video Title</td>
                  <td>{jsonData.title}</td>
                </tr>
                <tr>
                  <td>Image URL</td>
                  <td>
                    <a
                      href={`${jsonData.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ytHrefs"
                    >
                      <span className="alignment">
                        Image Link
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up-right-from-square"
                        >
                          <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                          <path d="m21 3-9 9" />
                          <path d="M15 3h6v6" />
                        </svg>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Video Link</td>
                  <td>
                    <a
                      href={`${jsonData.videoLink}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ytHrefs"
                    >
                      <span className="alignment">
                        Youtube
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up-right-from-square"
                        >
                          <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                          <path d="m21 3-9 9" />
                          <path d="M15 3h6v6" />
                        </svg>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Video Link (Alt)</td>
                  <td>
                    <a
                      href={`${jsonData.videoAltLink}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ytHrefs"
                    >
                      <span className="alignment">
                        Youtube
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up-right-from-square"
                        >
                          <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                          <path d="m21 3-9 9" />
                          <path d="M15 3h6v6" />
                        </svg>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Description (Short) </td>
                  <td>
                    <p>{jsonData.descriptionShort}</p>
                  </td>
                </tr>
                <tr>
                  <td>Description </td>
                  <td>
                    <p>
                      {isExpanded
                        ? jsonData.description
                        : jsonData.description
                            .split(" ")
                            .slice(0, jsonData.collapsed)
                            .join(" ") + "... "}
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="showMore"
                      >
                        {isExpanded ? collapseButtonText : expandButtonText}
                      </button>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>isCrawlable </td>
                  <td>{jsonData.isCrawlable ? "True" : "False"}</td>
                </tr>
                <tr>
                  <td>isLiveContent </td>
                  <td>{jsonData.isLiveContent ? "True" : "False"}</td>
                </tr>
                <tr>
                  <td>Length </td>
                  <td>
                    {formattedLength == 0 &&
                      currentFormatLength === 0 &&
                      `No data recieved yet!`}{" "}
                    {formattedLength != 0 &&
                      currentFormatLength === 0 &&
                      `${formattedLength / 60} minutes`}{" "}
                    {formattedLength != 0 &&
                      currentFormatLength === 1 &&
                      `${formattedLength.hours} hours and ${formattedLength.remainingMinutes} minutes`}{" "}
                    {formattedLength != 0 &&
                      currentFormatLength === 2 &&
                      `${formattedLength} hours`}{" "}
                    <button
                      className="switchButton"
                      onClick={() => switchFormatLength()}
                    >
                      Switch Format
                    </button>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      {ytTitle && thumbnailUrl ? (
        <DisplayYTData title={ytTitle} url={thumbnailUrl} />
      ) : (
        ""
      )}
    </>
  );
};
