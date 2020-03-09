<template>
  <div>
    <a-collapse accordion v-model="activeKey">
      <a-collapse-panel header="图层数据" key="1" :disabled="false">
        <p>定义数据属性</p>
        <div>
          <a-button @click="propertyModalVisible=true">添加属性</a-button>
        </div>
        <a-table :columns="propertyColumns"
                 :dataSource="properties"
                 :scroll="{ y: 320 }"
                 :rowKey="record=>record.name"
                 :pagination="false" size="small">
          <div slot="action" slot-scope="text, record">
            <a-popover title="确定删除吗?"
                       trigger="focus"
                       placement="right">
              <template slot="content">
                <div class="d-symmetry">
                  <a-button size="small" type="primary"
                            @click="deleteProperty(record)">确定
                  </a-button>
                  <a-button size="small">取消</a-button>
                </div>
              </template>
              <a-button type="danger" shape="circle" icon="delete"></a-button>
            </a-popover>
          </div>
        </a-table>
        <a-button @click="makeData">生成数据</a-button>
        <p>数据预览</p>
        <a-textarea placeholder="数据预览" v-model="layerDataString" :rows="4"/>
      </a-collapse-panel>
      <a-collapse-panel header="图层样式" key="2">
        <a-form>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="圆点个数">
            <a-input-number
                v-model="count"
                :min="1" :max="20"></a-input-number>
          </a-form-item>
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
      </a-collapse-panel>
    </a-collapse>

    <div class="d-bottom-button">
      <a-button type="primary" @click="addPointLayer">
        添加图层
      </a-button>
    </div>
    <a-modal title="添加属性" v-model="propertyModalVisible"
             @ok="addProperty">
      <a-form>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="属性名称">
          <a-input v-model="property.name" required="true"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
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
        activeKey: '1',
        propertyModalVisible: false,
        count: 1,
        option: {
          "type": constant.layerType.CIRCLE,
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
        property: {name: ''},
        properties: [],
        layerData: [],
      }
    },
    computed: {
      layerDataString() {
        return JSON.stringify(this.layerData);
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
          source: sourceId
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
      addProperty() {
        if (!this.property.name) {
          this.$message.warning("请输入属性名称");
          return;
        }
        this.properties.push(Object.assign({}, this.property));
        this.property.name = '';
      },
      deleteProperty(v) {

      },
      makeData() {
        if (this.properties.length == 0) {
          this.$message.warning("请添加属性");
          return;
        }
        this.layerData = [];
        let zb = getPointObjs(this.map.getCenter(), 10);
        for (let i = 0; i < 10; i++) {
          let obj = {};
          this.properties.forEach(p => {
            obj[p.name] = '随机的属性值' + new Date().getTime();
          });
          obj.zb = zb[i].coordinates;
          this.layerData.push(obj);
        }
      }
    }
  }
</script>

<style scoped>
  .d-bottom-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 4px 4px;
  }
</style>