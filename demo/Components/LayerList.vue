<template>
  <div class="layer-list">
    <a-table :columns="columns"
             style="margin-top: 8px;"
             :dataSource="layerList"
             :scroll="{ y: 460 }"
             :pagination="false" size="small">
      <label slot="name" slot-scope="text, record"
             :style="{color:record.color,'font-weight':'bold'}">
        {{text}}
      </label>
      <div class="d-symmetry" slot="action" slot-scope="text, record">
        <a-switch checkedChildren="显示"
                  unCheckedChildren="隐藏"
                  @change="showLayer(record)"
                  v-model="record.show"/>
        <a-popover title="确定删除吗?"
                   trigger="focus"
                   placement="right">
          <template slot="content">
            <div class="d-symmetry">
              <a-button size="small" type="primary"
                        @click="deleteLayer(record)">确定
              </a-button>
              <a-button size="small">取消</a-button>
            </div>
          </template>
          <a-button type="danger" shape="circle" icon="delete"></a-button>
        </a-popover>
      </div>
    </a-table>
  </div>
</template>

<script>
  import mapTools from "../../index";

  export default {
    name: "LayerList",
    props: ['map'],
    data() {
      return {
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            width: '60%',
            scopedSlots: {customRender: 'name'},
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: {customRender: 'action'},
          },
        ],
        layerList: []
      }
    },
    created() {
      this.$eBus.$on('add-layer', layer => {
        this.layerList.push(layer);
      })
    },
    methods: {
      deleteLayer(layer) {
        mapTools.removeLayer(this.map, layer.layerId);
        mapTools.removeSource(this.map, layer.sourceId);
        this.layerList = this.layerList.filter(e => {
          return e != layer;
        })
      },
      clearLayers() {
        this.layerList.forEach(e => {
          mapTools.removeLayer(this.map, e.layerId);
          mapTools.removeSource(this.map, e.sourceId);
        });
        this.layerList = [];
      },
      showLayer(layer) {
        mapTools.setLayerVisible(this.map, layer.layerId, layer.show);
      }
    },
    beforeDestroy() {
      this.$eBus.$off('add-layer');
    }
  }
</script>

<style scoped>
  .layer-list {
    position: absolute;
    width: 320px;
    top: 20px;
    right: 10px;
  }
</style>