export const DisplayYTData = ({ title, url }) => {
  return (
    <div className="ytData">
      <div className="ytDataContent">
        <h1 style={{marginBottom: "20px"}}>{title}</h1>
        <img src={`${url}`} alt={`${title}`} />
      </div>
    </div>
  );
};
