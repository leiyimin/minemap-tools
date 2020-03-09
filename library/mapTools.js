import baseTools from "./base";
import {getGeoJsonFromSourceData} from "./dataTools";

/**
 * 添加点图层
 * @param map
 * @param sourceId
 * @param layerId
 * @param coordinates 坐标数组，二维数组,每一个元素是一个点的坐标
 * @param option 图层配置信息，参考mimemap api
 * @returns {string|null|*} 错误信息
 */
const createPointLayer = function (map, sourceId, layerId, coordinates, option) {
  if (!map) return '地图不存在';
  try {
    removeLayer(map, layerId);
    removeSource(map, sourceId);
    let defaultLayerOption = {
      "id": layerId,
      "type": "circle",
      "source": sourceId,
      "paint": {
        'circle-radius': 15,
        'circle-color': "#ff0000"
      }
    };
    let features = baseTools.getPointFeatures(coordinates);
    if (features == null) {
      return '坐标数据错误';
    }
    let geoJson = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": features
      }
    };
    map.addSource(sourceId, geoJson);
    map.addLayer(Object.assign(defaultLayerOption, option || {}));
    return null;
  } catch (e) {
    return e;
  }
};
const addPoints = function (map, sourceId, coordinates) {

};

/**
 * 添加线图层
 * @param map
 * @param sourceId
 * @param layerId
 * @param coordinatesArr 坐标数组，三维数组,每一个元素是一条线的坐标集合
 * @param option 图层配置信息，参考mimemap api
 * @returns {string|null|*} 错误信息
 */
const createLineLayer = function (map, sourceId, layerId, coordinatesArr, option) {
  if (!map) return '地图不存在';
  try {
    removeLayer(map, layerId);
    removeSource(map, sourceId);
    let defaultLayerOption = {
      "id": layerId,
      "type": "line",
      "source": sourceId,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ff0000",
        "line-opacity": 1,
        "line-width": 2
      }
    };
    let features = baseTools.getLineFeatures(coordinatesArr);
    if (features == null) {
      return '坐标数据错误';
    }
    let geoJson = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": features
      }
    };
    map.addSource(sourceId, geoJson);
    map.addLayer(Object.assign(defaultLayerOption, option || {}));
    return null;
  } catch (e) {
    return e;
  }
};
/**
 * 往图层上添加线
 * @param map
 * @param sourceId
 * @param coordinateArr  坐标数组，三维数组,每一个元素是一条线的坐标集合
 * @returns {string|null|*} 错误信息
 */
const addLines = function (map, sourceId, coordinatesArr) {
  if (!map) return '地图不存在';
  try {
    let source = map.getSource(sourceId);
    if (!source) {
      //数据源不存在,
      return '数据源' + sourceId + '不存在';
    } else {
      //数据源存在，更新数据源即可
      let features = getFeatures(coordinatesArr);
      if (features == null) {
        return '坐标数据错误';
      }
      source._data.features = source._data.features.concat();
      source.setData(source._data);
    }
    return null;
  } catch (e) {
    return e;
  }
};

const createPolygonLayer = function (map, sourceId, layerId, coordinatesArr, option) {

  if (!map) return '地图不存在';
  try {
    removeLayer(map, layerId);
    removeSource(map, sourceId);
    let defaultLayerOption = {
      "id": layerId,
      "type": "fill",
      "source": sourceId,
      "paint": {
        'fill-color': '#022dff',
        'fill-opacity': 0.4,
        'fill-outline-color': '#b50e00'
      }
    };
    let features = baseTools.getPolygonFeatures(coordinatesArr);
    if (features == null) {
      return '坐标数据错误';
    }
    let geoJson = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": features
      }
    };
    map.addSource(sourceId, geoJson);
    map.addLayer(Object.assign(defaultLayerOption, option || {}));
    return null;
  } catch (e) {
    return e;
  }
};

const addPolygons = function (n) {
  console.log('这是mapTools!' + n);
};
const addLayer = function (map, dataParams, layerOption) {
  if (!map) return '地图不存在';
  let [sourceId, layerId] = [layerOption.source, layerOption.id];
  removeLayer(map, layerId);
  removeSource(map, sourceId);
  let geoJson = getGeoJsonFromSourceData(dataParams);
  // let defaultLayerOption = constant.defaultLayerOption[layerType];
  // layerOption = Object.assign(defaultLayerOption, layerOption);
  map.addSource(sourceId, geoJson);
  map.addLayer(layerOption);
};
const addMarker = function () {

};

const addPopup = function () {

};

const setLayerVisible = function (map, layerId, visible) {
  if (!map) return '地图不存在';
  if (!map.getLayer(layerId)) {
    return '图层不存在'
  }
  if (typeof visible === "boolean") {
    visible = visible ? 'visible' : 'none';
  }
  map.setLayoutProperty(layerId, 'visibility', visible);
};
const removeLayer = function (map, layerId) {
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
};
const removeSource = function (map, sourceId) {
  if (map.getSource(sourceId)) {
    map.removeSource(sourceId);
  }
};


export default {
  addLayer,
  createPointLayer,
  addPoints,
  createLineLayer,
  addLines,
  createPolygonLayer,
  addPolygons,
  addMarker,
  addPopup,
  setLayerVisible,
  removeLayer,
  removeSource
};