<template>
  <div>
    <a-menu @click="menuChange"
            mode="inline"
            :defaultOpenKeys="['layer']"
            theme="dark"
            :selectable="false"
            :inlineCollapsed="collapsed">
      <a-menu-item key="toggleCollapsed">
        <a-icon :type="toggleIconType"/>
        <span>{{!collapsed?'收起菜单':'展开菜单'}}</span>
      </a-menu-item>
      <a-sub-menu key="layer">
        <span slot="title">
          <a-icon type="appstore"/>
          <span>图层功能</span>
        </span>
        <a-menu-item key="layer:circle">圆点图层</a-menu-item>
        <a-menu-item key="layer:symbol">符号图层</a-menu-item>
        <a-menu-item key="layer:line">线图层</a-menu-item>
        <a-menu-item key="layer:fill">面图层</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: "AppMenu",
    data() {
      return {
        collapsed: false,
      }
    },
    computed: {
      toggleIconType() {
        if (!this.collapsed) {
          return 'menu-fold';
        }
        return "menu-unfold"
      }
    },
    methods: {
      menuChange(item) {
        if (item.key != 'toggleCollapsed')
          this.$emit('menu-change', item.key);
        else this.collapsed = !this.collapsed;
      }
    }
  }
</script>

<style scoped>

</style>