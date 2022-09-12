import { OverlappingModel } from "wavefunctioncollapse";

function Gen(sampleCanvasImgData) {
  let model = new OverlappingModel(
    sampleCanvasImgData.data,
    sampleCanvasImgData.width,
    sampleCanvasImgData.height,
    5,
    500,
    500,
    true,
    true,
    3
  );
  model.iterate(1, Math.random);
  // console.log(model.graphics(outputCanvasImgData.data));
  // console.log(outputCanvasImgData.data);

  return new ImageData(new Uint8ClampedArray(model.graphics()), 500, 500);

  //model.iterate(10, Math.random);
  //
  // alert(outputCanvasImgData);
}

export { Gen };
