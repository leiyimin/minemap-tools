<template>
  <div id="app">
    <MapView v-bind="mapConfig" @completed="mapLoad"></MapView>
    <app-menu class="menu" @menu-change="menuChange"></app-menu>
    <a-drawer
        title="圆点图层"
        :placement="drawerPlacement"
        :width="drawerWidth"
        @close="onDrawerClose"
        :mask="false"
        :visible="menu=='layer:circle'">
      <point-layers :map="map"></point-layers>
    </a-drawer>
    <a-drawer
        title="符号图层"
        :placement="drawerPlacement"
        :width="drawerWidth"
        @close="onDrawerClose"
        :mask="false"
        :visible="menu=='layer:symbol'">
      <symbol-layer :map="map"></symbol-layer>
    </a-drawer>
    <a-drawer
        title="线图层"
        :placement="drawerPlacement"
        :width="drawerWidth"
        @close="onDrawerClose"
        :mask="false"
        :visible="menu=='layer:line'">
      <line-layers :map="map"></line-layers>
    </a-drawer>
    <a-drawer
        title="面图层"
        :placement="drawerPlacement"
        :width="drawerWidth"
        @close="onDrawerClose"
        :mask="false"
        :visible="menu=='layer:fill'">
      <polygon-layer :map="map"></polygon-layer>
    </a-drawer>
    <a-drawer
        title="api文档"
        :placement="drawerPlacement"
        :width="820"
        @close="onDrawerClose"
        :mask="false"
        :visible="menu=='api'">
      <api-document></api-document>
    </a-drawer>
    <layer-list :map="map" v-show="false" class="layer-list"></layer-list>
  </div>
</template>

<script>
  import LineLayers from "./components/LineLayers";
  import PointLayers from "./components/PointLayers";
  import LayerList from "./components/LayerList";
  import PolygonLayer from "./components/PolygonLayer";
  import AppMenu from "./components/AppMenu";
  import ApiDocument from "./components/ApiDocument";
  import mapTools from "../library/mapTools";
  import iconCrossingJudged from '../public/images/icon-crossing-judged.png'
  import SymbolLayer from "./components/SymbolLayer";
  import mapConfig from '../public/config'

  export default {
    name: "App",
    components: {SymbolLayer, ApiDocument, AppMenu, PolygonLayer, LayerList, PointLayers, LineLayers},
    data() {
      return {
        map: undefined,
        menu: null,
        drawerWidth: 360,
        drawerPlacement: 'right'
      }
    },
    computed: {
      mapConfig() {
        // return window.mapConfig;
        return mapConfig;
      }
    },
    methods: {
      mapLoad(map) {
        this.map = map;
        map.loadImage(iconCrossingJudged, function (error, image) {
          if (error) throw error;
          map.addImage('icon-crossing-judged', image);
        });
        mapTools.addLayer(map, mapTools.getGeoJsonByFeatures([]), {
          id: 'layer1999',
          source: 'source1999',
          type: 'symbol',
          layout: {
            "icon-image": 'icon-crossing-judged'
          }
        });
      },
      menuChange(menu) {
        this.menu = menu;
      },
      onDrawerClose() {
        this.menu = null;
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style scoped lang="scss">
  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    top: 0;
    height: 100vh;
  }

  .menu {
    position: absolute;
    /*left: 0;*/
    height: 100vh;
    width: 200px;

    > /deep/ ul {
      height: 100%;
    }

    & /deep/ .ant-menu-inline-collapsed {
      width: 40px;
    }

    & /deep/ .ant-menu-inline-collapsed > .ant-menu-item,
    & /deep/ .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
      padding: 0 10px !important;
    }
  }

  .layer-list {
    position: absolute;
    width: 320px;
    top: 80px;
    right: 10px;
  }

  .d-symmetry {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

</style>