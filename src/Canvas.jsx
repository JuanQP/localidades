import { Image } from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import cartel from "./assets/cartel.png"

export function Canvas({ animal = '', adjetivo = '', kilometros = '', forwardedRef: canvasRef = null }) {

  const imageRef = useRef(null);
  const [base64Image, setBase64Image] = useState(null);

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

    setBase64Image(canvasRef.current.toDataURL('image/png'));
  }

  useEffect(() => {
    updateCanvas();
  }, [animal, adjetivo, kilometros]);

  return (
    <>
      {/* Canvas element is where I edit the image adding text.
        I don't want it to be shown because it doesn't allow me
        to copy to clipboard the canvas. I need an Image component to do that.
      */}
      <canvas
        id="canvas-cartel"
        ref={canvasRef}
        style={{display: 'none'}}
      />
      {/* This is where I "store" the original picture. It's just a hidden
      static Image which contains the original unedited picture */}
      <Image
        onLoad={updateCanvas}
        style={{display: 'none'}}
        imageRef={imageRef}
        src={cartel}
        alt="Cartel"
      />
      {/* When canvas finishes to update the image, then it shows that
        modified image here. This is the only Image that is shown and updated
      */}
      <Image
        id="edited-image"
        src={base64Image}
        alt="Cartel"
      />
    </>
  )
}
