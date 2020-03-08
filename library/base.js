const getPointFeatures = function (coordinates) {
  let features = [];
  for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i];
    if (!coordinate || coordinate.length != 2) {
      return null
    }
    features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": coordinate
      }
    });
  }
  return features;
};

const getLineFeatures = function (coordinatesArr) {
  let features = [];
  for (let i = 0; i < coordinatesArr.length; i++) {
    let coordinates = coordinatesArr[i];
    if (!coordinates || coordinates.length < 2) {
      return null
    }
    features.push({
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": coordinates
      }
    });
  }
  return features;
};

const getPolygonFeatures = function (coordinatesArr) {
  let features = [];
  for (let i = 0; i < coordinatesArr.length; i++) {
    let coordinates = coordinatesArr[i];
    if (!coordinates || coordinates.length != 1) {
      return null
    }
    if (coordinates[0].length < 4) {
      return null;
    }
    features.push({
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": coordinates
      }
    });
  }
  return features;
};

export default {getPointFeatures, getLineFeatures, getPolygonFeatures}