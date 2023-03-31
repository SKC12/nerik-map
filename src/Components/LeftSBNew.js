import greySphere from "../img/Grey_Sphere.webp";

function LeftSBNew(props) {
  let style = {
    backgroundImage: `url(${greySphere})`,
    width: "100px",
    height: "100px",
    backgroundSize: "102%",
    backgroundPosition: "center",
    backgroundColor: "white",
    borderRadius: "50%",
  };

  return (
    <div className="LEFTSB__data-container">
      <label className="LEFTSB__new-main-label">New Sphere:</label>
      <div className="LEFTSB__new-sphere-container">
        <div style={style}></div>
        <p className="LEFTSB__data">Drag into map to create new Sphere</p>
      </div>
      <label className="LEFTSB__new-main-label">New Flow River:</label>
    </div>
  );
}

export default LeftSBNew;
