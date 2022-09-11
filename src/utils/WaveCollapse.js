import { OverlappingModel } from "wavefunctioncollapse";

function Gen(sampleCanvasImgData) {
  console.log(sampleCanvasImgData);
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
  model.iterate(30, Math.random);
  // console.log(model.graphics(outputCanvasImgData.data));
  // console.log(outputCanvasImgData.data);

  return model.graphics();

  //model.iterate(10, Math.random);
  //
  // alert(outputCanvasImgData);
}

export { Gen };
