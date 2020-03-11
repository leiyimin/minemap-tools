<template>
  <div>
    <a-collapse accordion v-model="activeKey">
      <a-collapse-panel header="图层数据" key="1">
        <a-form layout="inline">
          <a-form-item label="数据规模">
            <a-input-number
                v-model="count"
                :min="1" :max="30"></a-input-number>
          </a-form-item>
          <a-form-item>
            <a-button type="primary"
                      @click="makeData">生成
            </a-button>
          </a-form-item>
        </a-form>
        <p style="margin-top: 16px;">代码预览</p>
        <a-textarea placeholder="代码预览"
                    v-model="layerDataString" :rows="10"
                    aria-readonly="true"/>
      </a-collapse-panel>
      <a-collapse-panel header="图层样式" key="2">
        <a-form>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="填充颜色">
            <el-color-picker size="small"
                             v-model="option.paint['circle-color']"></el-color-picker>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="边框宽度">
            <a-input-number
                v-model="option.paint['circle-stroke-width']"
                :min="1" :max="20"></a-input-number>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="边框颜色">
            <el-color-picker size="small"
                             v-model="option.paint['circle-stroke-color']"></el-color-picker>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="填充不透明度">
            <a-slider :min="0" :max="1" :step="0.01"
                      v-model="option.paint['circle-opacity']"/>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="边框不透明度">
            <a-slider :min="0" :max="1" :step="0.01"
                      v-model="option.paint['circle-stroke-opacity']"/>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="半径">
            <a-input-number
                v-model="option.paint['circle-radius']"
                :min="1" :max="20"></a-input-number>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="模糊度">
            <a-slider :min="0" :max="1" :step="0.01"
                      v-model="option.paint['circle-blur']"/>
          </a-form-item>
        </a-form>
        <p style="margin-top: 16px;">代码预览</p>
        <a-textarea placeholder="代码预览"
                    v-model="layerOptionsString" :rows="10"
                    aria-readonly="true"/>
      </a-collapse-panel>
    </a-collapse>

    <div class="d-bottom-button">
      <a-button type="danger" style="margin-right: 16px;"
                :disabled="layers.length==0"
                @click="clearPointLayer">
        清空图层
      </a-button>
      <a-button type="primary" @click="addPointLayer">
        添加图层
      </a-button>
    </div>
  </div>
</template>

<script>
  import mapTools from "../../index";
  import {getPointObjs} from "../script/public";

  export default {
    name: "PointLayers",
    props: ["map"],
    data() {
      return {
        activeKey: '1',
        count: 1,
        option: {
          "type": mapTools.layerType.CIRCLE,
          "paint": {
            "circle-color": "#ff0000", //圆的填充颜色，默认值为#000000，值类型为color字符串
            "circle-radius": 15, //圆半径，默认值为5，值类型为number，单位是像素
            "circle-opacity": 1, //圆不透明度，默认值为1，值类型为number
            "circle-blur": 0, //相当于模糊圆。值为1会使圆只有中心点是完全不透明，默认值为0，值类型为number
            "circle-stroke-width": 3, //圆的笔画宽度。笔画放置在“circle-radius”之外，默认值为0，值类型为number，单位是像素
            "circle-stroke-opacity": 1, //圆笔画不透明度，默认值为1，值类型为number
            "circle-stroke-color": "#000000", //圆的笔画颜色。默认值为"#000000"，值类型为color字符串
          }
        },
        labelCol: {span: 8},
        wrapperCol: {span: 14},
        propertyColumns: [{
          title: '属性名',
          dataIndex: 'name',
          width: '60%',
          scopedSlots: {customRender: 'name'},
        },
          {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
          },
        ],
        layerData: null,
        layers: []
      }
    },
    computed: {
      layerDataString() {
        if (!this.layerData) return "";
        return JSON.stringify(this.layerData);
      },
      layerOptionsString() {
        return JSON.stringify(this.option);
      }
    },
    methods: {
      addPointLayer() {
        if (!this.layerData || this.layerData.length == 0) {
          this.$message.warning("请先生成图层数据");
          return;
        }
        let now = new Date().getTime();
        let [sourceId, layerId] =
            ['source_point_' + now, 'layer_point_' + now];
        let option = Object.assign({
          id: layerId,
          source: sourceId
        }, this.option);
        let data = this.layerData;
        let coordinateFieldName = 'coordinates';
        let geometryType = mapTools.geometryType.POINT;
        let properties = [];
        mapTools.addLayerWithUntreatedData(this.map,
            {data, coordinateFieldName, geometryType, properties}, option);
        if (this.map.getZoom() < 13) {
          this.map.setZoom(13);
        }
        this.layers.push({
          name: '点图层_' + now,
          sourceId: sourceId,
          layerId: layerId,
          show: true,
          color: this.option.paint["circle-color"]
        })
      },
      clearPointLayer() {
        this.layers.forEach(e => {
          mapTools.removeLayer(this.map, e.layerId);
          mapTools.removeSource(this.map, e.sourceId);
        });
        this.layers = [];
      },
      makeData() {
        this.layerData = getPointObjs(this.map.getCenter(), this.count);
      }
    }
  }
</script>

<style scoped>

</style>