(function () {

  let solution = 7185;

  window.mapConfig = {
    accessToken: 'e919a6f32ce242f5aec22652d9dc1fdb',
    solution: solution,
    options: {
      container: 'map',
      style: '//minedata.cn/service/solu/style/id/' + solution,
      center: [116.1866179, 39.992559],
      zoom: 9,
      minZoom: 3,
      maxZoom: 17,
      logoControl: false //logo是否显示
    }
  };
})();

const domainUrl='https://map.xianjiaojing.com';
const solution=3492;

export default {
  accessToken: '18f589098bf14f5bac790331c60a37ae',
  solution: solution,
  options: {
    container: 'map',
    style: domainUrl + '/service/solu/style/id/'+solution,
    center: [108.947368, 34.288634],
    zoom: 11,
    pitch: 0,
    maxZoom: 17, //地图最大缩放级别限制
    minZoom: 8, //地图最小缩放级别限制
    logoControl: false //logo是否显示
  },
  urls: {
    domainUrl: domainUrl,
    dataDomainUrl: domainUrl,
    serviceUrl: domainUrl + '/service',
    // spriteUrl: domainUrl + '/minemapapi/v2.0.0/sprite/sprite',
  }
}