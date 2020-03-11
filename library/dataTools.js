import constant from "./constant";
import myClass from "./myClass";

export const getFeatures = function (params) {
  let features = [];
  params.data.forEach(obj => {
    let feature = getFeature(Object.assign(params, {data: obj}));
    if (feature)
      features.push(feature);
  });
  return features;
};
export const getFeature = function (params) {
  let dataObj = params.data;
  let type = params.geometryType;
  let coordinateFieldName = params.coordinateFieldName || 'coordinates';
  let properties = params.properties;
  const geometryType = constant.geometryType;
  // let feature = Object.assign({}, constant.featureTemplate);
  let feature = new myClass.Feature();
  feature.geometry.type = type;
  //处理坐标
  let coordinates = dataObj[coordinateFieldName];
  if (coordinates instanceof Array) {
    feature.geometry.coordinates = coordinates;
  } else if (typeof coordinates === 'string') {
    switch (type) {
      case geometryType.POINT:
        coordinates = pointStringToArray(coordinates);
        break;
      case geometryType.LINE_STRING:
        coordinates = lineStringToArray(coordinates);
        break;
      case geometryType.POLYGON:
        coordinates = polygonStringToArray(coordinates);
        break;
      case geometryType.MULTI_POINT:
        break;
      case geometryType.MULTI_LINE_STRING:
        break;
      case geometryType.MULTI_POLYGON:
        break;
      default:
        break;
    }
    if (!coordinates || !(coordinates instanceof Array)) {
      return null;
    }
    feature.geometry.coordinates = coordinates;
  } else {
    return null;
  }
  //处理properties
  if (!properties || properties.length > 0) {
    let prop = {};
    if (!properties) {
      Object.keys(dataObj).forEach(key => {
        if (key != coordinateFieldName) {
          prop[key] = dataObj[key];
        }
      });
    } else {
      properties.forEach(key => {
        prop[key] = dataObj[key];
      })
    }
    feature.properties = prop;
  }
  return feature;
};
export const pointStringToArray = function (pointString) {
  if (!pointString)
    return null;
  try {
    let arr = pointString.split(' ');
    let point = [];
    point.push(parseFloat(arr[0]));
    point.push(parseFloat(arr[1]));
    return point;
  } catch (e) {
    return e;
  }
};
export const lineStringToArray = function (lineString) {
  if (!lineString)
    return null;
  try {
    if (lineString.indexOf("LINESTRING") != -1) {
      let coordinates = [];
      let str = lineString.split('(')[1].split(')')[0];
      if (!str) return null;
      let arr = str.split(',');
      if (!arr || arr.length < 2) return null;
      arr.forEach(e => {
        let _arr = e.split(' ');
        let __arr = [];
        __arr.push(parseFloat(_arr[0]));
        __arr.push(parseFloat(_arr[1]));
        coordinates.push(__arr);
      });
      return coordinates;
    }
    return null;
  } catch (e) {
    return e;
  }
};
export const polygonStringToArray = function (polygonString) {
  if (!polygonString)
    return null;
  try {
    if (polygonString.indexOf("POLYGON") != -1) {
      let coordinates = [];
      let str = polygonString.split('((')[1].split('))')[0];
      if (!str) return null;
      let arr = str.split(',');
      if (!arr || arr.length < 3) return null;
      let array = [];
      arr.forEach(e => {
        let _arr = e.split(' ');
        let __arr = [];
        __arr.push(parseFloat(_arr[0]));
        __arr.push(parseFloat(_arr[1]));
        array.push(__arr);
      });
      //面首尾相接
      array.push([array[0][0], array[0][1]]);
      coordinates = [array];
      return coordinates;
    }
    return null;
  } catch (e) {
    return e;
  }
};
export const getGeoJsonFromUntreatedData = function (params) {
  let data;
  let source = params.data;
  if (source instanceof Array) {
    let features = getFeatures(params);
    data = new myClass.FeatureCollection(features);
  } else {
    data = getFeature(params);
  }
  return new myClass.GeoJson(data);
};
export const getGeoJsonByFeature = function (feature) {
  return new myClass.GeoJson(feature);
};
export const getGeoJsonByFeatures = function (features) {
  let data = new myClass.FeatureCollection(features);
  data.features = features;
  return new myClass.GeoJson(data);
};

export default {
  getFeature,
  getFeatures,
  getGeoJsonByFeature,
  getGeoJsonByFeatures,
  getGeoJsonFromUntreatedData,
  pointStringToArray,
  lineStringToArray,
  polygonStringToArray
}