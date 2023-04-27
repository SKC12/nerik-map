import useStore from "../../store";

export function SphereLimitsNode({ data }) {
  const scale = useStore((state) => state.scale);

  let sphereRadius = parseInt(data.sphereRadius) * scale * 10;

  return (
    <div>
      <svg width={sphereRadius + 1000} height={sphereRadius + 1000}>
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
