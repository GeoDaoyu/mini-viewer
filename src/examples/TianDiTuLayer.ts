import TianDiTuLayer from "@/layers/TianDiTuLayer";

const tianDiTuLayer = new TianDiTuLayer({
  id: "TianDiTu",
  title: "TianDiTu",
  url: "https://t7.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=fca13d89525bce353166926a7b4dae2e",
});

export default tianDiTuLayer;
