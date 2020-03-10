<template>
  <div>
    <a-collapse accordion>
      <a-collapse-panel v-for="(e,i) in apis" :header="e.name" :key="i">
        <api-template v-bind="e"></api-template>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
  import ApiTemplate from "./ApiTemplate";

  export default {
    name: "ApiDocument",
    components: {ApiTemplate},
    data() {
      return {
        apis: [
          {
            name: 'getGeoJsonFromUntreatedData',
            description: '把数据转换成geoJson格式',
            params: [{
              name: 'params',
              type: 'Object',
              required: '是',
              description: [{
                name: 'data',
                type: 'Array|Object',
                required: true,
                default: null,
                description: '数据源，单个或数组,必须包含坐标属性'
              }, {
                name: 'coordinateFieldName',
                type: 'String',
                required: true,
                default: 'coordinates',
                description: '数据对象中存放坐标的属性名'
              }, {
                name: 'geometryType',
                type: 'String',
                required: true,
                default: null,
                description: '图形类型，参考常量中的值'
              }, {
                name: 'properties',
                type: 'Array',
                required: false,
                default: null,
                description: '指定要拷贝到geometry中的属性，非必选，默认拷贝全部，[]代表不拷贝'
              }]
            }],
            returnValue: '标准的geoJson数据',
          },
          {
            name: 'addLayerWithUntreatedData',
            description: '用非geoJson数据添加图层',
            params: [{
              name: 'map',
              type: 'Object',
              required: true,
              description: '地图对象'
            }, {
              name: 'dataParams',
              type: 'Object',
              required: true,
              description: [{
                name: 'data',
                type: 'Array|Object',
                required: true,
                default: null,
                description: '数据源，单个或数组,必须包含坐标属性'
              }, {
                name: 'coordinateFieldName',
                type: 'String',
                required: true,
                default: 'coordinates',
                description: '数据对象中存放坐标的属性名'
              }, {
                name: 'geometryType',
                type: 'String',
                required: true,
                default: null,
                description: '图形类型，参考常量中的值'
              }, {
                name: 'properties',
                type: 'Array',
                required: false,
                default: null,
                description: '指定要拷贝到geometry中的属性，非必选，默认拷贝全部，[]代表不拷贝'
              }]
            }, {
              name: 'layerOptions',
              type: 'Object',
              required: true,
              description: '图层配置项，详细配置项请参考minemap api文档'
            }],
            returnValue: '出错信息，返回null代表执行成功',
          }
        ]
      }
    }
  }
</script>

<style scoped>
  table {
    border-color: #d5d5d5;
    border-collapse: collapse;
  }

  th {
    word-break: keep-all;
    padding: 8px;
  }

  td {
    padding: 4px 8px;
  }


</style>