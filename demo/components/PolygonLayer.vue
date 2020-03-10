<template>
  <div>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col>
        <label style="padding-right: 12px;">面的个数</label>
        <a-input-number
            v-model="count"
            :min="1" :max="10"></a-input-number>
      </a-col>
      <a-col>
        <label style="padding-right: 12px;">顶点个数</label>
        <a-input-number
            v-model="vertexNum"
            :min="3" :max="10"></a-input-number>
      </a-col>
    </a-row>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col>
        <a-row :gutter="12" type="flex" align="middle">
          <a-col>填充颜色</a-col>
          <a-col>
            <el-color-picker
                size="small"
                v-model="option.paint['fill-color']"></el-color-picker>
          </a-col>
        </a-row>
      </a-col>
      <a-col>
        <a-row :gutter="12" type="flex" align="middle">
          <a-col>边框颜色</a-col>
          <a-col>
            <el-color-picker
                size="small"
                v-model="option.paint['fill-outline-color']"></el-color-picker>
          </a-col>
        </a-row>

      </a-col>
    </a-row>
    <div style="margin-top: 64px">
      <a-button @click="addLayer"
                type="primary"
                style="float: right;">添加面图层
      </a-button>
    </div>
  </div>
</template>

<script>
  import mapTools from "../../index";

  export default {
    name: "PolygonLayer",
    props: ["map"],
    data() {
      return {
        count: 1,
        vertexNum: 4,
        option: {
          paint: {
            'fill-color': '#6c34ff',
            'fill-opacity': 0.4,
            'fill-outline-color': '#b50e00'
          }
        }
      }
    },
    methods: {
      addLayer() {
        let now = new Date().getTime();
        let [sourceId, layerId] =
            ['source_point_' + now, 'layer_point_' + now];
        let err = mapTools.createPolygonLayer(this.map, sourceId, layerId,
            this.getCoordinates(), this.option);
        if (err) {
          this.$message.error("错误：" + err);
          return;
        }
        if (this.map.getZoom() < 13) {
          this.map.setZoom(13);
        }
        this.$eBus.$emit('add-layer', {
          name: '面图层_' + now,
          sourceId: sourceId,
          layerId: layerId,
          show: true,
          color: this.option.paint["fill-color"]
        });
      },
      getCoordinates() {
        let point = this.map.getCenter();
        let max = 10;
        let min = 1;
        let polygons = [];
        for (let i = 0; i < this.count; i++) {
          let polygon = [];
          for (let j = 0; j < this.vertexNum; j++) {
            let random1 = (Math.random() * (max - min + 1) + min) / 1000;
            let random2 = (Math.random() * (max - min + 1) + min) / 1000;
            let vertex = [point.lng + random1, point.lat + random2];
            polygon.push(vertex);
          }
          polygon.push(polygon[0]);
          polygons.push([polygon]);
        }
        return polygons;
      }
    }
  }
</script>

<style scoped>
  label {
    padding-right: 16px;
  }
</style>