import { loadCSV } from "../data-loader";
import sphereData from "../data/radiant-triangle.csv";
import { useState, useRef, useEffect } from "react";
import frame from "../img/quadrants.svg";

function Map(props) {
  const [spheres, setSpheres] = useState(loadCSV(sphereData));
  const canvasRef = useRef(null);

  const draw = (ctx) => {
    let ratio = 1.421;
    let img = new Image(500, 500 * ratio);
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = frame;
    // img.height = 500;
    // img.width = 500 * ratio;
    console.log(img.width, img.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(500, 100, 50, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  }, []);

  return (
    <canvas ref={canvasRef} width={"2143px"} height={"1508px"}>
      {" "}
    </canvas>
  );
}

export default Map;
