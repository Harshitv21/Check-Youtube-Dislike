import { useState } from "react";

export const APILimitAndInfo = () => {
  const [isOpen, setIsOpen] = useState(null);

  function handleToggle() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="modalContainer">
      <div className={`infoBox ${isOpen ? "open" : ""}`} onClick={handleToggle} style={{userSelect: "none"}}>
        <p className="infoTitle">{isOpen ? '' : 'API Information'}</p>
        <p className="infoIcon">{isOpen ? "" : "+"}</p>

        {isOpen && (
          <div className="infoContentBox">
            <p className="infoMessage">
              <span>
                This application uses ReturnYoutubeDislike API which returns youtube dislike data using a couple of factors (refer their website <a href="https://returnyoutubedislike.com/" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "blue" }}>here</a>). I integrated the API into this React application to provide a UI along with some additional information which is obtained via web scrapping the video webpage. For more details and rate limit, visit the <a href="https://www.returnyoutubedislike.com/docs" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "blue" }}>API documentation page</a>.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
