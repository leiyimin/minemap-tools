export function getPointObjs(basePoint, count) {

  let objs = [];
  for (let i = 0; i < count; i++) {
    let coordinates = getRandomPoint(basePoint);
    objs.push({
      name: 'point_' + new Date().getTime(),
      index: i,
      coordinates: coordinates
    })
  }
  return objs;
}

export function getLineObjs(basePoint, count,linePointCount) {

  let objs = [];
  for (let i = 0; i < count; i++) {
    let line = [];
    for (let j = 0; j < linePointCount; j++) {
      line.push(getRandomPoint(basePoint));
    }
    objs.push({
      name: 'line_' + new Date().getTime(),
      index: i,
      coordinates: line
    })
  }
  return objs;
}

export function getPolygonObjs(basePoint, count,vertexNum) {

  let objs = [];
  for (let i = 0; i < count; i++) {
    let polygon = [];
    for (let j = 0; j < vertexNum; j++) {
      let vertex = getRandomPoint(basePoint);
      polygon.push(vertex);
    }
    polygon.push(polygon[0]);
    objs.push({
      name: 'polygon_' + new Date().getTime(),
      index: i,
      coordinates: [polygon]
    })
  }
  return objs;
}

function getRandomPoint(basePoint) {
  let max = 10;
  let min = 1;
  let random1 = (Math.random() * (max - min + 1) + min) / 1000;
  let random2 = (Math.random() * (max - min + 1) + min) / 1000;
  return [basePoint.lng + random1, basePoint.lat + random2];
}