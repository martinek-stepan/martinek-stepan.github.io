<template>
  <div class="card floating-card">
    <div class="card-body">
      <a href="#filter"
         v-for="tech in technologies"
         :key="tech"
         v-on:click.stop.prevent="techClick(tech)"
         v-bind:class="{ 'text-secondary': !selected.includes(tech) }"
      >{{tech}} </a>
      <div class="row">
        <a class="col-6 text-info"  href="#filter" v-on:click.stop.prevent="colapseAll">Collapse all</a>
        <a class="col-6 text-info" href="#filter" v-on:click.stop.prevent="expandAll">Expand all</a>
      </div>
    </div>
  </div>
</template>

<script>
  import collapseHelper from "../collapseHelper"

export default {
  props: {
    projects: { type: Array, required: true},
  },
  data: function(){
    return {
      selected: []
    };
  },
  computed: {
    technologies: function () {
      var allTechnologies = new Set();
      for (var project of this.projects)
      {
        project.technologies.forEach(item => allTechnologies.add(item))
      }
      return Array.from(allTechnologies).sort();
    }
  },
  methods: {
    techClick: function (technology) {
      var index = this.selected.indexOf(technology);
      if (index !== -1)
      {
        this.selected.splice(index, 1);
        collapseHelper.collapse(false, this.selected);
      }
      else
      {
        this.selected.push(technology);
        collapseHelper.collapse(true, this.selected);
      }
    },
    colapseAll: function () {
      this.selected = [];
      collapseHelper.collapse(false, this.selected);
    },
    expandAll: function () {
      this.selected = JSON.parse(JSON.stringify(this.technologies));
      collapseHelper.collapse(true, this.technologies);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .floating-card {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 250px;
  }
</style>
