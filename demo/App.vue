<template>
  <div id="app">
    <MapView v-bind="mapConfig" @completed="mapLoad"></MapView>
    <a-drawer
        title="地图功能"
        placement="left"
        :width="360"
        :bodyStyle="{
          padding:'0 16px 16px'
        }"
        :closable="false"
        :mask="false"
        :visible="this.map!=undefined">
      <a-tabs
          defaultActiveKey="point" size="small">
        <a-tab-pane tab="点图层" key="point">
          <point-layers :map="map"></point-layers>
        </a-tab-pane>
        <a-tab-pane tab="线图层" key="line">
          <line-layers :map="map"></line-layers>
        </a-tab-pane>
        <a-tab-pane tab="面图层" key="polygon">
          <polygon-layer :map="map"></polygon-layer>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <layer-list :map="map"></layer-list>
  </div>
</template>

<script>
  import LineLayers from "./Components/LineLayers";
  import PointLayers from "./Components/PointLayers";
  import LayerList from "./Components/LayerList";
  import PolygonLayer from "./Components/PolygonLayer";

  export default {
    name: "App",
    components: {PolygonLayer, LayerList, PointLayers, LineLayers},
    data() {
      return {
        map: undefined,
      }
    },
    computed: {
      mapConfig() {
        return window.mapConfig;
      }
    },
    methods: {
      mapLoad(map) {
        this.map = map;
      },
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    top: 0;
    height: 100vh;
  }

  .d-symmetry {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .ant-row,
  .ant-row-flex {
    margin: 4px 0 !important;
  }
</style>