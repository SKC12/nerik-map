import bg from "../img/quadrants.svg";

export function BgNode({ data }) {
  let width = data.width;
  let height = data.height;

  let style = {
    width: width,
    height: height,
    backgroundImage: `url("${bg}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <div style={style}></div>
    </>
  );
}
