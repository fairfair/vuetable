<template>
  <div class="flex justify-between align-items">
    <div class="my-auto">
      <div v-if="selectedFilters.length > 0">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
            <option
                v-for="tab in selectedFilters"
                :key="tab.name"
                :selected="tab.active"
            >{{ tab.value }}</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="flex space-x-4" aria-label="Tabs">
            <a
                v-for="(tab, index) in selectedFilters"
                :key="index"
                :href="tab.href"
                :class="[tab.active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'px-3 py-2 font-medium text-sm rounded-md cursor-pointer']"
                :aria-current="tab.active ? 'page' : undefined"
                @click="clickFilter(tab.name)"
            >
              {{ tab.value }}
            </a>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-end m-2">
      <button
          class="bg-red-100 p-2 mr-2 font-medium text-sm rounded-md cursor-pointer"
          @click="reset"
      >
        <svg class="w-6 h-6 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <button
          class="bg-indigo-100 p-2 font-medium text-sm rounded-md cursor-pointer"
          @click="refresh" >
        <svg class="w-6 h-6 text-indigo-500 hover:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    filters: Object,
  },
  data() {
    return {
      selectedFilters: [],
    };
  },
  computed: {
    filterTabHasChanged() {
      let res = false;
      this.selectedFilters.forEach((filter, i) => {
        if (this.selectedFilters[i].active === true) res = true;
      });
      return res;
    },
  },
  created() {
    this.constructSelectedFilters();
  },
  methods: {
    constructSelectedFilters() {
      if (this.filters) {
        this.filters.forEach((filter) => {
          const newFilter = {
            value: filter.text,
            name: filter.filter,
            active: false,
          };
          this.selectedFilters.push(newFilter);
        });
      }
      this.updateActiveFilters();
    },

    clickFilter(filter) {
      // todo: emit event to refresh filters
      tableStore.updateFilter({
        name: filter,
      });
      this.updateActiveFilters();
      this.$parent.fetch();
    },

    updateActiveFilters() {
      this.selectedFilters.forEach((filter, i) => {
        this.selectedFilters[i].active = this.filters.includes(filter.name);
      });
    },

    reset() {
      // refresh filters
      this.updateActiveFilters();
      this.$parent.resetTable();
    },

    refresh() {
      this.$parent.fetch();
    },
  },
}
</script>

<style scoped>

</style>
