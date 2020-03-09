/**
 * 常量
 * */
export const geometryType = {
  POINT: "Point",
  MULTI_POINT: "MultiPoint",
  LINE_STRING: "LineString",
  MULTI_LINE_STRING: "MultiLineString",
  POLYGON: "Polygon",
  MULTI_POLYGON: "MultiPolygon",
};
// 图层类型：
// fill、
// line、
// symbol、
// circle、
// heatmap、
// extrusion、
// raster、
// tracking、
// sprite、
// symtracking、
// histogram、
// background、
// airline、
// dynamicLine
export const layerType = {
  CIRCLE: "circle",
  SYMBOL: "symbol",
  LINE: "line",
  FILL: "fill"
};
export const defaultLayerOption = {
  circle: {
    "minzoom": 3, //这个图层的最小缩放等级
    "maxzoom": 18, //这个图层的最大缩放等级
    "filter": undefined,// 筛选器，筛选数据源，仅显示通过筛选的数据
    "type": layerType.CIRCLE,
    "layout": { //图层的布局属性
      "visibility": "visible", //图层是否可见，可选值为"visible"(默认值)，"none"
    },
    "paint": {  //这个图层的绘制属性
      "circle-color": "#000000", //圆的填充颜色，默认值为#000000，值类型为color字符串
      "circle-radius": 5, //圆半径，默认值为5，值类型为number，单位是像素
      "circle-opacity": 1, //圆不透明度，默认值为1，值类型为number
      "circle-blur": 0, //相当于模糊圆。值为1会使圆只有中心点是完全不透明，默认值为0，值类型为number
      "circle-stroke-width": 0, //圆的笔画宽度。笔画放置在“circle-radius”之外，默认值为0，值类型为number，单位是像素
      "circle-stroke-opacity": 1, //圆笔画不透明度，默认值为1，值类型为number
      "circle-stroke-color": "#000000", //圆的笔画颜色。默认值为"#000000"，值类型为color字符串
      "circle-translate": [0, 0], //圆相对于锚点的偏移。值是[x，y]，正值表示右和下，负数分别表示左和上，默认值为[0,0]，值类型为array，单位是像素
      "circle-translate-anchor": "map", //circle-translate的锚点，可选值有"map"(默认值，圆相对于地图进行偏移)，"viewport"(圆相对于视区进行偏移)
      "circle-pitch-scale": "map", //控制地图倾斜时圆的缩放行为，可选值有"map"(默认值，圆是根据它们与相机的视距离来缩放的)，"viewport"(圆没有缩放)
      "circle-pitch-alignment": "viewport", //地图倾斜时圆的方向，可选值有"viewport"(默认值，圆与视区平面对齐)，"map"(圆与地图平面对齐)
    }
  },
  symbol: {
    "minzoom": 3, //这个图层的最小缩放等级
    "maxzoom": 18, //这个图层的最大缩放等级
    "filter": undefined,// 筛选器，筛选数据源，仅显示通过筛选的数据
    "type": layerType.SYMBOL,
    "layout": { //图层的布局属性
      "visibility": "visible", //symbol是否可见，可选值为"visible"(默认值)，"none"
      "symbol-placement": "point", //相对于几何图形，标签的位置，可选值为"point"(默认值，标签放置在几何图形所在的点上)，"line"(标签沿几何图形的线条放置。只能在“linestring”和“polygon”几何图形上使用)，"line-center"(标签放置在几何图形线条的中心。只能在“linestring”和“polygon”几何图形上使用。请注意，矢量图块中的单个特征可能包含多个线条几何图形)
      "symbol-spacing": 250, //两个标签锚点之间的距离，默认值为250，单位是像素
      "symbol-avoid-edges": false,//是否开启标签防碰撞功能，如果是true，标签之间不会相互叠加，默认值为false
      "icon-allow-overlap": false, //如果为true，则icon将可见，即使它与以前绘制的其他symbol冲突，默认值为false
      "icon-ignore-placement": false, //如果为真，则即使其他symbol与icon冲突，也可以看到它们，默认值为false
      "icon-optional": false, //如果为真，则当icon与其他symbol冲突且文本不与其他symbol冲突时，文本将不显示相应的icon，默认值为false
      "icon-rotation-alignment": "auto", //结合“symbol-placement”，确定图标的旋转，可选值为"auto"(默认值，当`symbol-placement`为“point”时，'auto'就相当于`viewport`,当`symbol-placement`为“line”或者“line-center”时，'auto'就相当于`map`)，"map"(当“symbol-placement”设置为“point”时，将图标东西对齐。当“symbol-placement”设置为“line”或“line-center”时，图标x轴与线条对齐)，"viewport"(生成其x轴与视区的x轴对齐的图标，而不管“symbol-placement”的值如何)
      "icon-size": 1, //按提供的倍数缩放icon的原始大小，值为1时，是原始大小；值为3时，是原始大小的3倍。默认值为1
      "icon-text-fit": "none", //缩放图标以适应相关文本，可选值为"none"(默认值，图标以其固有的纵横比显示)，"width"(图标在X维度中缩放以适应文本的高度)，"height"(图标在Y维度中缩放以适应文本的高度)，"both"(图标在X和Y维度上都是按比例缩放的)
      "icon-text-fit-padding": [0, 0, 0, 0], //由“icon-text-fit”确定的尺寸中的附加区域的大小，按顺时针顺序：顶部、右侧、底部、左侧。默认值为[0,0,0,0],单位是像素
      "icon-image": '//minedata.cn', //"icon-image"的纹理，值类型为string
      "icon-rotate": 0, //顺时针旋转图标，默认值为0，值类型为number，单位是度
      "icon-padding": 2, //图标周围附加区域的大小，可用于symbol碰撞检测，默认值为2，值类型为number，单位是像素
      "icon-keep-upright": false, //如果为true，则可以自动翻转图标以防止它被颠倒，默认值为false，值类型为Boolean
      "icon-offset": [0, 0], //图标与其定位点的偏移距离[x,y]。正值表示右和下，负值表示左和上。将每个组件乘以“icon-size”的值，以获得以像素为单位的最终偏移量。当与“icon-rotate”组合时，偏移量将类似于旋转方向向上。默认值为[0,0]
      "icon-anchor": "center", //图标与锚点的相对位置，可选值为"center"(默认值)、"left"、"right"、"top"、"bottom"、"top-left"、"top-right"、"bottom-left"、"bottom-right"
      "icon-pitch-alignment": "auto", //地图倾斜时图标的方向，可选值为"auto"(默认值，自动匹配)，"map"(图标与地图平面对齐)，"viewport"(图标与视区平面对齐)
      "text-pitch-alignment": "auto", //地图倾斜时文本的方向，可选值为"auto"(默认值，自动匹配)，"map"(文本与地图平面对齐)，"viewport"(文本与视区平面对齐)
      "text-rotation-alignment": "auto", //结合“symbol-placement”，确定文本的旋转，可选值为"auto(默认值，当`symbol-placement`为“point”时，'auto'就相当于`viewport`,当`symbol-placement`为“line”或者“line-center”时，'auto'就相当于`map`)"，"map(当“symbol-placement”设置为“point”时，将文本东西对齐。当“symbol-placement”设置为“line”或“line-center”时，文本x轴与线条对齐)"，"viewport(生成其x轴与视区的x轴对齐的文本，而不管“symbol-placement”的值如何)"
      "text-field": "", //文本标签的内容，默认值为“”，值类型为string
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"], //字体种类，默认值为["Open Sans Regular", "Arial Unicode MS Regular"]，值类型为array
      "text-size": 16, //字体大小，默认值为16，值类型为number，单位是像素
      "text-max-width": 10, //文本换行的最大行宽，默认值为10，值类型为number,单位是ems
      "text-line-height": 1.2, //文本的行高，默认值为1.2，值类型为number,单位是ems
      "text-letter-spacing": 0, //文本跟踪量，值类型为number,单位是ems
      "text-justify": "center", //文本对齐选项，可选值为"left"、"center"(默认值)、"right"
      "text-anchor": "center", //文本与锚点的相对位置，可选值为"center"(默认值)、"left"、"right"、"top"、"bottom"、"top-left"、"top-right"、"bottom-left"、"bottom-right"
      "text-max-angle": 45, //相邻字符之间的最大角度变化，默认值是45，值类型为number,单位是度
      "text-rotate": 0, //顺时针旋转文本，默认值是0，值类型为number,单位是度
      "text-padding": 2, //文字周围附加区域的大小，可用于symbol碰撞检测，默认值为2，值类型为number，单位是像素
      "text-keep-upright": true, //如果为true，则可以自动翻转文字以防止它被颠倒，默认值为false，值类型为Boolean
      "text-transform": "none", //指定如何将文本大写，类似于css的“text-transform”属性，可选值为"none"(默认值，文本不做处理)，"uppercase"(文本转为大写字母)，"lowercase"(文本转为小写字母)
      "text-offset": [0, 0], //图标与其定位点的偏移距离[x,y]。正值表示右和下，负值表示左和上。默认值为[0,0]，单位是ems
      "text-allow-overlap": false, //如果为true，即使与其它symbol相叠，文本也会可见，默认值为false，值类型为Boolean
      "text-ignore-placement": false, //如果为true，则即使其他symbol与文本冲突，也可以看到文本，默认值为false
      "text-optional": false, //如果为真，则当文本与其他symbol冲突且icon不与其他symbol冲突时，icon将不显示相应的文本，默认值为false
    },
    "paint": {  //这个图层的绘制属性
      "icon-color": "#000000", //icon的颜色，默认值为#000000，值类型为color字符串
      "icon-opacity": 1, //icon不透明度，默认值为1，值类型为number
      "icon-halo-width": 0, //光晕到图标轮廓的距离，默认值为0，值类型为number，单位是像素
      "icon-halo-blur": 0, //从里到外光环渐渐变淡，默认值为0，值类型为number，单位是像素
      "icon-halo-color": "rgba(0, 0, 0, 0)", //icon光环的颜色。icon光环只能与SDF icon一起使用，默认值为"rgba(0, 0, 0, 0)"，值类型为color字符串
      "icon-translate": [0, 0], //icon相对于锚点的偏移。值是[x，y]，正值表示右和下，负数分别表示左和上，默认值为[0,0]，值类型为array，单位是像素
      "icon-translate-anchor": "map", //icon-translate的锚点，可选值有"map"(默认值，icon相对于地图进行偏移)，"viewport"(icon相对于视区进行偏移)
      "text-color": "#000000", //文本的颜色，默认值为#000000，值类型为color字符串
      "text-opacity": 1, //文本不透明度，默认值为1，值类型为number
      "text-halo-width": 0, //光晕到文本轮廓的距离，默认值为0，值类型为number，单位是像素
      "text-halo-blur": 0, //从里到外光环渐渐变淡，默认值为0，值类型为number，单位是像素
      "text-halo-color": "rgba(0, 0, 0, 0)", //文本光环的颜色，有助于它从背景中脱颖而出，默认值为"rgba(0, 0, 0, 0)"，值类型为color字符串
      "text-translate": [0, 0], //文本相对于锚点的偏移。值是[x，y]，正值表示右和下，负数分别表示左和上，默认值为[0,0]，值类型为array，单位是像素
      "text-translate-anchor": "map", //text-translate的锚点，可选值有"map"(默认值，文本相对于地图进行偏移)，"viewport"(文本相对于视区进行偏移)
      "render-road-mark": false, //是否为路标，默认值为false，值类型为boolean
      "symbol-height-offset": 0, //标志的高度偏移，默认值为0，值类型为number
      "render-3d": false, //是否进行三维渲染，默认值为false，值类型为boolean
    }
  },
  line: {
    "id": "water",
    "source": "streets",
    "source-layer": "water",//数据源如果是vector类型的话，这个参数是必须的
    "minzoom": 3, //这个图层的最小缩放等级
    "maxzoom": 18, //这个图层的最大缩放等级
    "filter": undefined,// 筛选器，筛选数据源，仅显示通过筛选的数据
    "type": layerType.LINE,
    "layout": { //图层的布局属性
      "visibility": "visible", //线是否可见，可选值为"visible(默认值)"，"none"
      "line-cap": "butt",//线端的形状，可选值为"butt(默认值，平直边缘)"，"round(圆型)"，"square(正方形)"
      "line-join": "miter", //两条线交汇时，交汇点的边角类型，可选值为"miter(默认值，尖角)"，"round(圆角)"，"bevel(斜角)"
      "line-miter-limit": 2,//只有当"line-join"属性为"miter"时，此属性才有效，代表两条线斜接长度限定值，当斜接长度超过此值时，边角形状会自动将"line-join"属性改为"bevel"，默认值为2
      "line-round-limit": 1.05, //只有当"line-join"属性为"round"时，此属性才有效，代表两条线斜接长度限定值，当斜接长度超过此值时，边角形状会自动将"line-join"属性改为"miter"，默认值为1.05
      "border-visibility": "none",//线边框是否可见，可选值为"visible"，"none(默认值)"
    },
    "paint": {  //这个图层的绘制属性
      "line-color": "#000000", //线的颜色，值类型为color，默认值为"#000000"
      "line-opacity": 1, //线不透明度，默认值为1，值类型为number
      "line-width": 1, //线的宽度，默认值为1，值类型为number，单位是像素
      "line-border-width": 0, //线边界的宽度，默认值为0，值类型为number，单位是像素
      "line-border-opacity": 1, //线边界的透明度，默认值为1，值类型为number
      "line-border-color": "#ffffff", //线边界的颜色，值类型为color字符串
      "line-translate": [0, 0], //几何体的偏移。值是[x，y]，正值表示右和下，其中负数分别表示左和上，默认值为[0,0]，值类型为array，单位是像素
      "line-translate-anchor": "map", //line-translate的锚点，可选值有"map(默认值)"，"viewport"
      "line-gap-width": 0, //在线外面加上一个线套管，值表示套管和线之间间隙的宽度，默认值为0，值类型为number，单位是像素
      "line-offset": 0, //线的偏移量，正值相对于直线方向向右偏移直线，负值相对于左侧偏移，默认值为0，值类型为number，单位是像素
      "line-blur": 0, //线的模糊度，单位是像素，默认值为0，值类型为number
      "line-dasharray": [3, 3], //短划线的小线段和间隙的长度，值类型为number
      "line-gradient": "#000000", //线的渐变色，值类型为color字符串
      "line-pattern": 'Exhibition-15', //纹理贴图，值类型为string，这个字符串名称可以在http://minedata.cn/minemapapi/v2.0.0/sprite/sprite@2x.json文件中找到
    }
  },
  fill: {
    "minzoom": 3, //这个图层的最小缩放等级
    "maxzoom": 18, //这个图层的最大缩放等级
    "filter": undefined,// 筛选器，筛选数据源，仅显示通过筛选的数据
    "type": layerType.FILL,
    "layout": { //图层的布局属性
      "visibility": "visible" //此图层是否可见，可选值为"visible(默认值)"，"none"
    },
    "paint": {  //这个图层的绘制属性
      "fill-color": "#000000", //填充层的颜色，值类型为color字符串，默认值为"#000000"
      "fill-antialias": true, //填充物是否应抗锯齿，默认值为true，值类型为boolean
      "fill-opacity": 1, //整个填充层的不透明度，默认值为1，值类型为number
      "fill-outline-color": "#00ffff", //填充的轮廓颜色。如果未指定和“fill color”相同，值类型为color字符串
      "fill-translate": [0, 0], //几何体的偏移。值是[x，y](默认值为[0,0])，正值表示右和下，其中负数分别表示左和上，值类型为array，单位是像素
      "fill-translate-anchor": "map", //fill-translate的锚点，可选值有"map(默认值)"，"viewport"
      "fill-pattern": 'Exhibition-15', //纹理贴图，值类型为string，这个字符串名称可以在http://minedata.cn/minemapapi/v2.0.0/sprite/sprite@2x.json文件中找到
      "fill-water": "none", //是否展示水面特效，可选值为"water"，"none(默认值)"
    }
  },
};

export const geoJsonDataType = {
  FEATURE: "Feature",
  FEATURE_COLLECTION: "FeatureCollection"
};

export default {
  defaultLayerOption,
  geometryType,
  layerType,
  geoJsonDataType,
};