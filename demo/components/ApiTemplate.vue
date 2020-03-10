<template>
  <div>
    <p>{{description}}</p>
    <label>参数</label>
    <table border="1">
      <thead>
      <tr>
        <th>名称</th>
        <th>类型</th>
        <th>必选</th>
        <th>描述</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(e,i) in params" :key="i">
        <td>{{e.name}}</td>
        <td>{{e.type}}</td>
        <td>{{e.required?'是':'否'}}</td>
        <td>
          <template v-if="typeof e.description ==='string'">
            {{e.description}}
          </template>
          <template v-else>
            <div>
              <p>属性</p>
              <table class="tb-inner" border="1px solid #ddd">
                <thead>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                  <th>必选</th>
                  <th>默认值</th>
                  <th>描述</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(o,j) in e.description" :key="j">
                  <td>{{o.name}}</td>
                  <td>{{o.type}}</td>
                  <td>{{o.required?'是':'否'}}</td>
                  <td>{{o.default?o.default:'无'}}</td>
                  <td>{{o.description}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <label>返回值</label>
    <p>{{returnValue}}</p>
  </div>
</template>

<script>
  export default {
    name: "ApiTemplate",
    props: {
      description: {
        type: String
      },
      params: {
        type: Array
      },
      returnValue: {
        type: String
      },
    },

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