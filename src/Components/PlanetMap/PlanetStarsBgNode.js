import stars from "../../img/stars.webp";

export function StarsBgNode({ data }) {
  let width = data.width;
  let height = data.height;

  let style = {
    width: width,
    height: height,
    backgroundImage: `url("${stars}")`,
    backgroundSize: "20000px",
    // backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <div style={style}></div>
    </>
  );
}

export default StarsBgNode;
