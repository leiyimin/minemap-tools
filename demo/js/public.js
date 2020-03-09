export function getPointObjs(basePoint, count) {

  let objs = [];
  let max = 10;
  let min = 1;
  for (let i = 0; i < count; i++) {
    let random1 = (Math.random() * (max - min + 1) + min) / 1000;
    let random2 = (Math.random() * (max - min + 1) + min) / 1000;
    let coordinates = [basePoint.lng + random1, basePoint.lat + random2];
    objs.push({
      name: 'point_' + new Date().getTime(),
      index: i,
      coordinates: coordinates
    })
  }
  return objs;
}