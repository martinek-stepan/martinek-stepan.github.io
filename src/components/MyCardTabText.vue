<template>
  <div class="tab-pane fade show active" :id="project.id+'-text'" role="tabpanel" :aria-labelledby="project.id+'-text'">
    <div class="custom-padding" v-for="(item, index) in project.text" :key="index">
      <p class="text-small mt-2 font-weight-light" v-if="typeof item === 'string'">{{item}}</p>
      <ul v-else-if="Array.isArray(item)">
        <li v-for="(text, i) in item" :key="i">
          <p class="text-small mt-2 font-weight-light">{{text}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      project: { type: Object, required: true},
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .custom-padding {
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
