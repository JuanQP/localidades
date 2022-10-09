import { Image, Skeleton } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import cartel from "./assets/cartel.png";

/**
 * https://stackoverflow.com/a/37511463
 */
function removeAccents(text = '') {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function Canvas({
  animal = '',
  adjetivo = '',
  kilometros = '',
  forwardedRef: canvasRef = null,
  canUpdate = false,
}) {

  const imageRef = useRef(null);
  const visibleImageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  function updateCanvas() {
    if(!canvasRef.current || !imageRef.current) return;

    const animalText = removeAccents(animal).toUpperCase();
    const adjetivoText = removeAccents(adjetivo).toUpperCase();
    const kilometrosText = removeAccents(kilometros).toUpperCase();

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.style.width = "100%";
    canvasRef.current.width = 700;
    canvasRef.current.height = 502;
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.font = "bold 30px 'Roadgeek 2000 Series C'";
    ctx.fillStyle = "#abb9bd";
    ctx.textAlign = "left";

    // Add shadow
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 1;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    // Rotate a little bit to fit better road sign
    ctx.setTransform(1, 0.032, 0, 1, 0, 0);
    ctx.scale(1.63, 1.8);
    ctx.fillText(animalText, 158, 154);
    ctx.fillText(adjetivoText, 158, 179);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Kilometers text
    ctx.restore();
    ctx.setTransform(1, 0.04, 0, 1, 0, 0);
    ctx.scale(1.38, 2.2);
    ctx.textAlign = "center";
    ctx.fillText(kilometrosText, 427, 130);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    visibleImageRef.current.src = canvasRef.current.toDataURL('image/png');
  }

  useEffect(() => {
    // If font or image aren't loaded, do nothing.
    if(!canUpdate || !imageLoaded) return;

    updateCanvas();
  }, [animal, adjetivo, kilometros, canUpdate, imageLoaded]);

  return (
    <>
      {!canUpdate && (<Skeleton
        visible={!canUpdate}
        width={'100%'}
        height={200}
      />)}
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
        style={{display: 'none'}}
        onLoad={() => setImageLoaded(true)}
        imageRef={imageRef}
        src={cartel}
        alt="Cartel"
      />
      {/* When canvas finishes to update the image, then it shows that
        modified image here. This is the only Image that is shown and updated
      */}
      <Image
        id="edited-image"
        imageRef={visibleImageRef}
        alt="Cartel"
      />
    </>
  )
}
