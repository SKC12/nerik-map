import useStore from "../../store";
import stars from "../../img/stars.webp";

export function SphereLimitsNode({ data }) {
  const scale = useStore((state) => state.scale);

  let sphereRadius = parseInt(data.sphereRadius) * scale * 10;
  let style = {
    backgroundImage: `url("${stars}")`,
    backgroundSize: "20000px",
    borderRadius: "100%",
  };

  return (
    <div>
      <svg
        style={style}
        width={sphereRadius + 1000}
        height={sphereRadius + 1000}
      >
        <circle
          filter="url(#shadow)"
          cx={"50%"}
          cy={"50%"}
          r={sphereRadius / 2}
          fill="transparent"
          stroke="white"
          strokeWidth={"600px"}
        />
      </svg>
    </div>
  );
}

export default SphereLimitsNode;
