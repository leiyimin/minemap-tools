import {
  getFeature,
  getGeoJsonFromUntreatedData,
  getGeoJsonByFeatures,
  getGeoJsonByFeature,
  getFeatures, getSourceData
} from "./dataTools";
import {geometryType, layerType} from "./constant";
import myClass, {FeatureCollection} from "./myClass";

/**
 *
 * @param map
 * @param dataParams
 * Object 有四个属性
 * ｛
 *   data:Object|Array 数据源，单个或数组,必须包含坐标属性
 *   coordinateFieldName:String 数据对象中存放坐标的属性名,非必选，默认为'coordinates’
 *   geometryType:String 图形类型，参考常量中的值
 *   properties:Array 指定要拷贝到geometry中的属性，非必选，默认拷贝全部，[]代表不拷贝
 * ｝
 * @param layerOptions 图层配置项，参考minemap api文档
 */
export const addLayerWithUntreatedData = function (map, dataParams, layerOptions) {
  if (!map) return;
  let geoJson = getGeoJsonFromUntreatedData(dataParams);
  if (!geoJson) {
    return;
  }
  addLayer(map, geoJson, layerOptions);
};
export const addLayer = function (map, geoJson, layerOptions) {
  if (!map) return;
  let [sourceId, layerId] = [layerOptions.source, layerOptions.id];
  removeLayer(map, layerId);
  removeSource(map, sourceId);
  map.addSource(sourceId, geoJson);
  map.addLayer(layerOptions);
};
export const updateSourceDataWithUntreatedData = function (map, sourceId, dataParams) {
  if (!map) return;
  updateSourceData(map, sourceId, getSourceData(dataParams));
};
export const updateSourceData = function (map, sourceId, data) {
  if (!map) return;
  let source = map.getSource(sourceId);
  if (!source) return;
  source.setData(data);
};
export const clearSourceDate = function (map, sourceId) {
  if (!map) return;
  let source = map.getSource(sourceId);
  if (!source) return;
  source.setData(new FeatureCollection([]));
};
const addSimpleMarker = function (map, point, icon, options) {
  let op = {map: map, position: point, icon: icon};
  return new minemap.Marker(Object.assign(op, options || {})).addTo(map);

};
const addCustomMarker = function (map, point, el, options) {
  return new minemap.Marker(el, options || {}).setLngLat(point).addTo(map);
};

const addPopup = function () {

};

const setLayerVisible = function (map, layerId, visible) {
  if (!map) return;
  if (!map.getLayer(layerId)) {
    return;
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
  layerType,
  geometryType,
  getFeature,
  getGeoJsonFromUntreatedData,
  addLayerWithUntreatedData,
  addLayer,
  addSimpleMarker,
  addCustomMarker,
  addPopup,
  setLayerVisible,
  removeLayer,
  removeSource,
  updateSourceData,
  updateSourceDataWithUntreatedData,
  getGeoJsonByFeatures,
  getSourceData,
  clearSourceDate
};