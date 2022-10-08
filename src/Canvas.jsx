import { Image } from "@mantine/core"
import { useRef } from "react"
import cartel from "./assets/cartel.png"

export function Canvas({ animal, adjetivo, kilometros }) {

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  function updateCanvas() {
    if(!canvasRef.current || !imageRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.style.width = "100%";
    canvasRef.current.width = 700;
    canvasRef.current.height = 502;
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#abb9bd";
    ctx.textAlign = "center";
    // Rotate a little bit to fit better road sign
    ctx.setTransform(1, 0.032, 0, 1, 0, 0);
    ctx.scale(1, 1.8);
    ctx.fillText(animal.toUpperCase(), 365, 150);
    ctx.fillText(adjetivo.toUpperCase(), 365, 178);
    ctx.fillText(kilometros.toUpperCase(), 590, 162);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    console.log("Canvas updated");
  }

  updateCanvas();

  return (
    <>
      <canvas
        id="canvas-cartel"
        ref={canvasRef}
      />
      <Image
        onLoad={updateCanvas}
        style={{display: 'none'}}
        imageRef={imageRef}
        src={cartel}
        alt="Cartel"
      />
    </>
  )
}
