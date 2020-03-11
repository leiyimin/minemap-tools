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
    <div class="d-bottom-button">
      <a-button type="danger" style="margin-right: 16px;"
                :disabled="layers.length==0"
                @click="clearLayer">
        清空图层
      </a-button>
      <a-button @click="addLayer"
                type="primary"
                style="float: right;">添加图层
      </a-button>
    </div>

  </div>
</template>

<script>
  import mapTools from "../../index";
  import {getPolygonObjs} from "../script/public";

  export default {
    name: "PolygonLayer",
    props: ["map"],
    data() {
      return {
        count: 1,
        vertexNum: 3,
        layers: [],
        option: {
          type: mapTools.layerType.FILL,
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
          ['source_fill_' + now, 'layer_fill_' + now];
        let option = Object.assign({
          id: layerId,
          source: sourceId
        }, this.option);
        let data = getPolygonObjs(this.map.getCenter(), this.count,this.vertexNum);
        let coordinateFieldName = 'coordinates';
        let geometryType = mapTools.geometryType.POLYGON;
        mapTools.addLayerWithUntreatedData(this.map,
          {data, coordinateFieldName, geometryType}, option);
        if (this.map.getZoom() < 13) {
          this.map.setZoom(13);
        }
        this.layers.push({
          name: '面图层_' + now,
          sourceId: sourceId,
          layerId: layerId,
          show: true,
          color: this.option.paint["fill-color"]
        });
      },
      clearLayer() {
        this.layers.forEach(e => {
          mapTools.removeLayer(this.map, e.layerId);
          mapTools.removeSource(this.map, e.sourceId);
        });
        this.layers = [];
      },
    }
  }
</script>

<style scoped>
  label {
    padding-right: 16px;
  }
</style>