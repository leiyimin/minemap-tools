/**
 * 常量
 * */
export const geometryType = {
  POINT: "Point",
  MULTI_POINT: "MultiPoint",
  LINE_STRING: "LineString",
  MULTI_LINE_STRING: "MultiLineString",
  POLYGON: "Polygon",
  MULTI_POLYGON: "MultiPolygon",
};
// 图层类型：
// fill、
// line、
// symbol、
// circle、
// heatmap、
// extrusion、
// raster、
// tracking、
// sprite、
// symtracking、
// histogram、
// background、
// airline、
// dynamicLine
export const layerType = {
  CIRCLE: "circle",
  SYMBOL: "symbol",
  LINE: "line",
  FILL: "fill"
};

export const geoJsonDataType = {
  FEATURE: "Feature",
  FEATURE_COLLECTION: "FeatureCollection"
};

export default {
  geometryType,
  layerType,
  geoJsonDataType,
};