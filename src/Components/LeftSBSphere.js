function LeftSBSphere(props) {
  const selectedData = props.selectedData;
  return selectedData ? (
    <div className="LEFTSB__data-container">
      <label className="LEFTSB__data-label">Name:</label>
      <p className="LEFTSB__data">{selectedData.sphere}</p>
      <label className="LEFTSB__data-label">
        Sphere Radius (Million Miles):
      </label>
      <p className="LEFTSB__data">{selectedData.sphereRadius}</p>
      <label className="LEFTSB__data-label">Region:</label>
      <p className="LEFTSB__data">{selectedData.region}</p>
      <label className="LEFTSB__data-label">Flow River:</label>
      <p className="LEFTSB__data">{selectedData.flowRiver}</p>
      <label className="LEFTSB__data-label">Population:</label>
      <p className="LEFTSB__data">{selectedData.population}</p>
      <label className="LEFTSB__data-label">Activity Level:</label>
      <p className="LEFTSB__data">{selectedData.activity}</p>
      <label className="LEFTSB__data-label">Controlled by:</label>
      <p className="LEFTSB__data">{selectedData.controlled}</p>
      <label className="LEFTSB__data-label">Description:</label>
      <p className="LEFTSB__data">{selectedData.description}</p>
      <label className="LEFTSB__data-label">Source:</label>
      <p className="LEFTSB__data">{selectedData.source}</p>
      <label className="LEFTSB__data-label">Creator:</label>
      <p className="LEFTSB__data">{selectedData.creator}</p>
      <label className="LEFTSB__data-label">Website:</label>
      <a href={selectedData.website} className="LEFTSB__data LEFTSB__data-link">
        {selectedData.website}
      </a>
    </div>
  ) : null;
}

export default LeftSBSphere;
