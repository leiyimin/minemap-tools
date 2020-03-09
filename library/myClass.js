import {geoJsonDataType} from "./constant";

export const Feature = class {
  constructor() {
    this.type = geoJsonDataType.FEATURE;
    this.properties = {};
    this.geometry = {
      "type": '',
      "coordinates": []
    };
  }
};

export const FeatureCollection = class {
  constructor(features) {
    this.type = geoJsonDataType.FEATURE_COLLECTION;
    this.features = features;
  }
};

export const GeoJson = class {
  constructor(data) {
    this.type = "geojson";
    this.data = data;
  }
};

export default {
  GeoJson,
  FeatureCollection,
  Feature
};