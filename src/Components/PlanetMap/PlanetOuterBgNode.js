import bg from "../../img/Outercircle.svg";

export function PlanetOuterBgNode({ data }) {
  let width = data.width;
  let height = data.height;

  let style = {
    width: width,
    height: height,
    backgroundImage: `url("${bg}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return <div style={style}></div>;
}

export default PlanetOuterBgNode;
