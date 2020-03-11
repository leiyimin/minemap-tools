<template>
  <div>
    <div class="d-bottom-button">
      <a-button type="danger" style="margin-right: 16px;"
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
  import mapTools from "../../library/mapTools";

  export default {
    name: "SymbolLayer",
    props: ['map'],
    data() {
      return {
        layerData: [
          {
            "descInfo": "",
            "weight_grade": 1,
            "juncName": "航天中路-神舟二路",
            "unBalanceIndex": 0,
            "lnglat": "108.96063000000001,34.1592",
            "juncId": "2834",
            "isUnBalance": false,
            "selected": false
          }, {
            "descInfo": "",
            "weight_grade": 1,
            "juncName": "芙蓉街-红专南路",
            "unBalanceIndex": 0,
            "lnglat": "108.95038,34.21529",
            "juncId": "903",
            "isUnBalance": false,
            "selected": false
          }, {
            "descInfo": "",
            "weight_grade": 1,
            "juncName": "瞪羚一路-瞪羚路",
            "unBalanceIndex": 1.1,
            "lnglat": "108.86184500000002,34.201665",
            "juncId": "619",
            "isUnBalance": false,
            "selected": false
          }, {
            "descInfo": "",
            "weight_grade": 1,
            "juncName": "纺织城正街-纺四路",
            "unBalanceIndex": 2.2,
            "lnglat": "109.064705,34.264605",
            "juncId": "2146",
            "isUnBalance": false,
            "selected": false
          }, {
            "descInfo": "",
            "weight_grade": 1,
            "juncName": "尚稷路-秦汉大道",
            "unBalanceIndex": 0,
            "lnglat": "108.947805,34.394330000000004",
            "juncId": "1684",
            "isUnBalance": false,
            "selected": false
          }],
      }
    },
    created() {
      this.layerData.forEach(e => {
        e.lnglat = e.lnglat.toPoint(',');
      })
    },
    methods: {
      addLayer() {
        mapTools.updateSourceDataWithUntreatedData(this.map,
            'source1999', {
              data: this.layerData,
              coordinateFieldName: 'lnglat',
              geometryType: mapTools.geometryType.POINT,
              properties: []
            });
        this.map.setCenter(this.layerData[0].lnglat)
      },
      clearLayer() {
        mapTools.clearSourceDate(this.map, 'source1999');
      }
    }
  }
</script>

<style scoped>

</style>