import phlogiston from "../../img/phlogiston.webp";

export function StarsBgNode({ data }) {
  let width = data.width;
  let height = data.height;

  let style = {
    width: width,
    height: height,
    backgroundImage: `url("${phlogiston}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <div style={style}></div>
    </>
  );
}

export default StarsBgNode;
