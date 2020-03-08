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

