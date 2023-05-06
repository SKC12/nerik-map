import "../../../style/SideBar.css";
import { useReactFlow } from "reactflow";
import sphereBg from "../../../img/Grey_Sphere.webp";
import { useCallback } from "react";
import useStore from "../../../store";
import { shallow } from "zustand/shallow";

function SphereCard(props) {
  const key = props.key;
  const { setCenter } = useReactFlow();
  const nodes = useStore((state) => state.nodes, shallow);
  const setNodes = useStore((state) => state.setNodes, shallow);
  const node = props.node;
  const coords = node.position;
  const onClickSelect = useCallback(() => {
    setNodes(
      nodes.map((nd) => {
        if (nd.id === node.id) {
          nd.selected = true;
        } else {
          nd.selected = false;
        }
        return nd;
      })
    );
  }, [node.id, nodes, setNodes]);

  if (!node.data) return null;

  return (
    <div
      key={key}
      className="LEFTSB__sphere-card"
      onClick={(e) => {
        onClickSelect(node);
        setCenter(coords.x, coords.y, {
          duration: 2000,
          zoom: 8,
        });
      }}
    >
      <div className="LEFTSB__sphere-card-img-container">
        <img className="LEFTSB__sphere-card-img" src={sphereBg} alt=""></img>
      </div>
      <div className="LEFTSB__sphere-card-data-container">
        <p className="LEFTSB__sphere-card-name">{node.data.shortName}</p>

        <div className="LEFTSB__sphere-card-info-container">
          <p className="LEFTSB__sphere-card-data">
            Creator: {node.data.creator}
          </p>
          <p className="LEFTSB__sphere-card-data">Source: {node.data.source}</p>
        </div>
      </div>
    </div>
  );
}

export default SphereCard;
