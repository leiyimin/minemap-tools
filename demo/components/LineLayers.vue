<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col :span="11">
        <a-input addonBefore="线的条数"
                 v-model="lineCount"
                 min="1" max="10"
                 type="number"
                 placeholder="线的条数"></a-input>
      </a-col>
      <a-col :span="11">
        <a-input addonBefore="线的端点数"
                 v-model="linePointCount"
                 type="number"
                 min="2" max="99"
                 placeholder="线的端点数"></a-input>
      </a-col>
    </a-row>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col :span="16">
        <a-input addonBefore="线的宽度"
                 v-model="lineWidth"
                 type="number"
                 min="1" max="8"
                 placeholder="线的宽度"></a-input>
      </a-col>
      <a-col :span="6">
        <a-row type="flex" align="middle">
          <a-col :span="14">线颜色</a-col>
          <a-col :span="10">
            <el-color-picker size="small" v-model="lineColor"></el-color-picker>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div style="margin-top: 64px">
      <a-button @click="addLineLayer"
                type="primary"
                style="float: right;">添加线图层
      </a-button>
    </div>
  </div>
</template>

<script>
  import mapTools from "../../index";

  export default {
    name: "LineLayers",
    props: ["map"],
    data() {
      return {
        lineCount: 1,
        linePointCount: 3,
        lineColor: '#ff0000',
        lineWidth: 2,
      }
    },
    methods: {
      addLineLayer() {
        let layerId, sourceId;
        let now = new Date().getTime();
        sourceId = 'source_line_' + now;
        layerId = 'layer_line_' + now;
        let err = mapTools.createLineLayer(this.map, sourceId, layerId,
            this.getLineCoordinatesArr(this.map.getCenter(),
                this.lineCount || 1,
                this.linePointCount || 5), {
              "paint": {
                "line-color": this.lineColor || "#ff0000",
                "line-width": parseInt('' + this.lineWidth || 2)
              }
            });
        if (err) {
          this.$message.error("错误：" + err);
          return;
        }
        if (this.map.getZoom() < 13) {
          this.map.setZoom(13);
        }
        this.$eBus.$emit('add-layer', {
          name: '线图层_' + now,
          sourceId: sourceId,
          layerId: layerId,
          show: true,
          color: this.lineColor
        });
      },
      getLineCoordinatesArr(basePoint, lineCount, pointCount) {
        let arr = [];
        let max = 10;
        let min = 1;
        for (let i = 0; i < lineCount; i++) {
          let line = [];
          for (let j = 0; j < pointCount; j++) {
            let random1 = (Math.random() * (max - min + 1) + min) / 1000;
            let random2 = (Math.random() * (max - min + 1) + min) / 1000;
            line.push([basePoint.lng + random1, basePoint.lat + random2]);
          }
          arr.push(line);
        }
        console.log(arr);
        return arr;
      },
    }
  }
</script>

<style scoped>

</style>