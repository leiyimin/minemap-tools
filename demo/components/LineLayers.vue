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
<!--        <a-input addonBefore="线的宽度"-->
<!--                 v-model="option.paint['line-width']"-->
<!--                 type="number"-->
<!--                 min="1" max="8"-->
<!--                 placeholder="线的宽度"></a-input>-->
      </a-col>
      <a-col :span="6">
        <a-row type="flex" align="middle">
          <a-col :span="14">线颜色</a-col>
          <a-col :span="10">
            <el-color-picker size="small" v-model="option.paint['line-color']"></el-color-picker>
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
      <a-button @click="addLineLayer"
                type="primary"
                style="float: right;">添加图层
      </a-button>
    </div>
  </div>
</template>

<script>
  import mapTools from "../../index";
  import {getLineObjs} from "../script/public";

  export default {
    name: "LineLayers",
    props: ["map"],
    data() {
      return {
        lineCount: 1,
        linePointCount: 3,
        layers: [],
        option: {
          "type": mapTools.layerType.LINE,
          "layout": { //图层的布局属性
            "visibility": "visible", //线是否可见，可选值为"visible(默认值)"，"none"
            "line-cap": "butt",//线端的形状，可选值为"butt(默认值，平直边缘)"，"round(圆型)"，"square(正方形)"
            "line-join": "miter", //两条线交汇时，交汇点的边角类型，可选值为"miter(默认值，尖角)"，"round(圆角)"，"bevel(斜角)"
            "line-miter-limit": 2,//只有当"line-join"属性为"miter"时，此属性才有效，代表两条线斜接长度限定值，当斜接长度超过此值时，边角形状会自动将"line-join"属性改为"bevel"，默认值为2
            "line-round-limit": 1.05, //只有当"line-join"属性为"round"时，此属性才有效，代表两条线斜接长度限定值，当斜接长度超过此值时，边角形状会自动将"line-join"属性改为"miter"，默认值为1.05
            "border-visibility": "none",//线边框是否可见，可选值为"visible"，"none(默认值)"
          },
          "paint": {  //这个图层的绘制属性
            "line-color": "#388dff", //线的颜色，值类型为color，默认值为"#000000"
            "line-opacity": 1, //线不透明度，默认值为1，值类型为number
            "line-width": 4, //线的宽度，默认值为1，值类型为number，单位是像素
            "line-border-width": 0, //线边界的宽度，默认值为0，值类型为number，单位是像素
            "line-border-opacity": 1, //线边界的透明度，默认值为1，值类型为number
            "line-border-color": "#ffffff", //线边界的颜色，值类型为color字符串
            "line-blur": 0, //线的模糊度，单位是像素，默认值为0，值类型为number
          }
        }
      }
    },
    methods: {
      addLineLayer() {
        let now = new Date().getTime();
        let [sourceId, layerId] =
          ['source_line_' + now, 'layer_line_' + now];
        let option = Object.assign({
          id: layerId,
          source: sourceId
        }, this.option);
        let data = getLineObjs(this.map.getCenter(), this.lineCount,this.linePointCount);
        let coordinateFieldName = 'coordinates';
        let geometryType = mapTools.geometryType.LINE_STRING;
        mapTools.addLayerWithUntreatedData(this.map,
          {data, coordinateFieldName, geometryType}, option);
        if (this.map.getZoom() < 13) {
          this.map.setZoom(13);
        }
        this.layers.push({
          name: '线图层_' + now,
          sourceId: sourceId,
          layerId: layerId,
          show: true,
          color: this.option.paint["line-color"]
        })
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

</style>