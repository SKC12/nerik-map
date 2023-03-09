import "../style/Sphere.css";

export function SphereNode({ data }) {
  let width = data.sphereRadius / 400 + "px";
  let height = data.sphereRadius / 400 + "px";
  let fontSize = data.sphereRadius / 700 + "px";

  //console.log(width);
  let style = {
    width: width,
    height: height,

    fontSize: fontSize,
  };
  return (
    <>
      <div className="SPHERE_node" style={style}>
        <label>{data.sphere}</label>
      </div>
    </>
  );
}
