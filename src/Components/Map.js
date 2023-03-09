import { loadCSV } from "../data-loader";
import sphereData from "../data/radiant-triangle.csv";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import frame from "../img/quadrants.svg";

const ORIGIN = Object.freeze({ x: 0, y: 0 });

const { devicePixelRatio: ratio = 1 } = window;

function diffPoints(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function addPoints(p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

function scalePoint(p, scale) {
  return { x: p.x / scale, y: p.y / scale };
}

const ZOOM_SENSITIVITY = 500;

function Map(props) {
  const canvasWidth = props.width;
  const canvasHeight = props.height;
  const [spheres, setSpheres] = useState(loadCSV(sphereData));
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(ORIGIN);
  const [mousePos, setMousePos] = useState(ORIGIN);
  const [viewportTopLeft, setViewportTopLeft] = useState(ORIGIN);
  const isResetRef = useRef(false);
  const lastMousePosRef = useRef(ORIGIN);
  const lastOffsetRef = useRef(ORIGIN);

  // update last offset
  useEffect(() => {
    lastOffsetRef.current = offset;
  }, [offset]);

  // reset
  const reset = useCallback(
    (context) => {
      if (context && !isResetRef.current) {
        // adjust for device pixel density
        context.canvas.width = canvasWidth * ratio;
        context.canvas.height = canvasHeight * ratio;
        context.scale(ratio, ratio);
        setScale(1);

        // reset state and refs
        setContext(context);
        setOffset(ORIGIN);
        setMousePos(ORIGIN);
        setViewportTopLeft(ORIGIN);
        lastOffsetRef.current = ORIGIN;
        lastMousePosRef.current = ORIGIN;

        // this thing is so multiple resets in a row don't clear canvas
        isResetRef.current = true;
      }
    },
    [canvasWidth, canvasHeight]
  );

  // functions for panning
  const mouseMove = useCallback(
    (event) => {
      if (context) {
        const lastMousePos = lastMousePosRef.current;
        const currentMousePos = { x: event.pageX, y: event.pageY }; // use document so can pan off element
        lastMousePosRef.current = currentMousePos;

        const mouseDiff = diffPoints(currentMousePos, lastMousePos);
        setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
      }
    },
    [context]
  );

  const mouseUp = useCallback(() => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }, [mouseMove]);

  const startPan = useCallback(
    (event) => {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      lastMousePosRef.current = { x: event.pageX, y: event.pageY };
    },
    [mouseMove, mouseUp]
  );

  // setup canvas and set context
  useLayoutEffect(() => {
    if (canvasRef.current) {
      // get new drawing context
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        reset(renderCtx);
      }
    }
  }, [reset, canvasHeight, canvasWidth]);

  // pan when offset or scale changes
  useLayoutEffect(() => {
    if (context && lastOffsetRef.current) {
      console.log(
        offset,
        lastOffsetRef.current,
        scalePoint(diffPoints(offset, lastOffsetRef.current), scale)
      );
      const offsetDiff = scalePoint(
        diffPoints(offset, lastOffsetRef.current),
        scale
      );
      context.translate(offsetDiff.x, offsetDiff.y);
      setViewportTopLeft((prevVal) => diffPoints(prevVal, offsetDiff));
      isResetRef.current = false;
    }
  }, [context, offset, scale]);

  // add event listener on canvas for mouse position
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) {
      return;
    }

    function handleUpdateMouse(event) {
      event.preventDefault();
      if (canvasRef.current) {
        const viewportMousePos = { x: event.clientX, y: event.clientY };
        const topLeftCanvasPos = {
          x: canvasRef.current.offsetLeft,
          y: canvasRef.current.offsetTop,
        };
        setMousePos(diffPoints(viewportMousePos, topLeftCanvasPos));
      }
    }

    canvasElem.addEventListener("mousemove", handleUpdateMouse);
    canvasElem.addEventListener("wheel", handleUpdateMouse);
    return () => {
      canvasElem.removeEventListener("mousemove", handleUpdateMouse);
      canvasElem.removeEventListener("wheel", handleUpdateMouse);
    };
  }, []);

  // add event listener on canvas for zoom
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) {
      return;
    }

    // this is tricky. Update the viewport's "origin" such that
    // the mouse doesn't move during scale - the 'zoom point' of the mouse
    // before and after zoom is relatively the same position on the viewport
    function handleWheel(event) {
      event.preventDefault();
      if (context) {
        const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
        const viewportTopLeftDelta = {
          x: (mousePos.x / scale) * (1 - 1 / zoom),
          y: (mousePos.y / scale) * (1 - 1 / zoom),
        };
        const newViewportTopLeft = addPoints(
          viewportTopLeft,
          viewportTopLeftDelta
        );

        context.translate(viewportTopLeft.x, viewportTopLeft.y);
        context.scale(zoom, zoom);
        context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y);

        setViewportTopLeft(newViewportTopLeft);
        setScale(scale * zoom);
        isResetRef.current = false;
      }
    }

    canvasElem.addEventListener("wheel", handleWheel);
    return () => canvasElem.removeEventListener("wheel", handleWheel);
  }, [context, mousePos.x, mousePos.y, viewportTopLeft, scale]);

  // draw
  useLayoutEffect(() => {
    if (context) {
      const squareSize = 20;

      // clear canvas but maintain transform
      const storedTransform = context.getTransform();
      context.canvas.width = context.canvas.width;
      context.setTransform(storedTransform);

      let imgratio = 1.421;
      let img = new Image(500, 500 * imgratio);
      img.onload = function () {
        context.drawImage(img, 0, 0, canvasWidth * ratio, canvasHeight * ratio);
      };
      img.src = frame;

      context.fillRect(
        canvasWidth / 2 - squareSize / 2,
        canvasHeight / 2 - squareSize / 2,
        squareSize,
        squareSize
      );
      context.arc(viewportTopLeft.x, viewportTopLeft.y, 5, 0, 2 * Math.PI);
      context.fillStyle = "red";
      context.fill();
    }
  }, [canvasWidth, canvasHeight, context, scale, offset, viewportTopLeft]);

  // const draw = (ctx) => {
  //   let ratio = 1.421;
  //   let img = new Image(500, 500 * ratio);
  //   img.onload = function () {
  //     ctx.drawImage(img, 0, 0);
  //   };
  //   img.src = frame;
  //   // img.height = 500;
  //   // img.width = 500 * ratio;
  //   console.log(img.width, img.height);
  //   ctx.fillStyle = "#000000";
  //   ctx.beginPath();
  //   ctx.arc(500, 100, 50, 0, 2 * Math.PI);
  //   ctx.fill();
  // };

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   draw(context);
  // }, []);

  return (
    <div>
      <button onClick={() => context && reset(context)}>Reset</button>
      <pre>scale: {scale}</pre>
      <pre>offset: {JSON.stringify(offset)}</pre>
      <pre>viewportTopLeft: {JSON.stringify(viewportTopLeft)}</pre>
      <canvas
        onMouseDown={startPan}
        ref={canvasRef}
        width={canvasWidth * ratio}
        height={canvasHeight * ratio}
        style={{
          border: "2px solid #000",
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
        }}
      ></canvas>
    </div>
    // <canvas ref={canvasRef} width={"2143px"} height={"1508px"}>
    //   {" "}
    // </canvas>
  );
}

export default Map;
