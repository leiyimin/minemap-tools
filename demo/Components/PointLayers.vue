<template>
  <div>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col>
        <label style="padding-right: 12px;">点的半径</label>
        <a-input-number
            v-model="option.paint['circle-radius']"
            :min="5" :max="99"></a-input-number>
      </a-col>
      <a-col>
        <a-row type="flex" align="middle" :gutter="12">
          <a-col>点的颜色</a-col>
          <a-col>
            <el-color-picker
                size="small"
                v-model="option.paint['circle-color']"></el-color-picker>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row type="flex" align="middle">
      <a-col :span="5">点的个数</a-col>
      <a-col>
        <a-input-number
            v-model="count"
            :min="1" :max="20"></a-input-number>
      </a-col>
    </a-row>
    <div style="margin-top: 64px">
      <a-button @click="addPointLayer"
                type="primary"
                style="float: right;">添加点图层
      </a-button>
    </div>
  </div>
</template>

<script>
  import mapTools from "../../index";
  import {getPointObjs} from "../js/public";
  import constant from "../../library/constant";

  export default {
    name: "PointLayers",
    props: ["map"],
    data() {
      return {
        count: 2,
        option: {
          "type": constant.layerType.CIRCLE,
          "paint": {
            'circle-radius': 15,
            'circle-color': "#ff0000"
          }
        },
      }
    },
    methods: {
      addPointLayer() {
        let now = new Date().getTime();
        let [sourceId, layerId] =
          ['source_point_' + now, 'layer_point_' + now];
        // let err = mapTools.createPointLayer(this.map, sourceId, layerId,
        //   this.getPointCoordinates(this.map.getCenter(), this.count || 3), this.option);
        let option = Object.assign({
          id: layerId,
          source: sourceId,
          filter: ['>', 'index', 1]
        }, this.option);
        let data = getPointObjs(this.map.getCenter(), this.count);
        let coordinateFieldName = 'coordinates';
        let geometryType = constant.geometryType.POINT;
        let properties = [];
        let err = mapTools.addLayer(this.map,
          {data, coordinateFieldName, geometryType, properties}, option);
        if (err) {
          this.$message.error("错误：" + err);
          return;
        }
        if (this.map.getZoom() < 13) {
          this.map.setZoom(13);
        }
        this.$eBus.$emit('add-layer', {
          name: '点图层_' + now,
          sourceId: sourceId,
          layerId: layerId,
          show: true,
          color: this.option.paint["circle-color"]
        });
      },
      getPointCoordinates(basePoint, count) {
        let max = 10;
        let min = 1;
        let points = [];
        for (let i = 0; i < count; i++) {
          let random1 = (Math.random() * (max - min + 1) + min) / 1000;
          let random2 = (Math.random() * (max - min + 1) + min) / 1000;
          points.push([basePoint.lng + random1, basePoint.lat + random2]);
        }
        return points;
      },
    }
  }
</script>

<style scoped>

</style>