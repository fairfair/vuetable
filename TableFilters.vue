<template>
  <div class="flex justify-between align-items">
    <div class="my-auto">
      <div v-if="filters.length > 0">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
            <option
                v-for="tab in filters"
                :key="tab.value"
                :selected="tab.active"
            >{{ tab.name }}</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="flex space-x-3" aria-label="Tabs">
            <a
                v-for="(tab, index) in filters"
                :key="index"
                :href="tab.href"
                :class="[tab.active ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:text-gray-700', 'px-3 py-2 font-medium text-sm rounded-md cursor-pointer']"
                :aria-current="tab.active ? 'page' : undefined"
                @click="clickFilter(tab)"
            >
              {{ tab.name }}
            </a>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-end">
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
    filterButtons: Array,
    name: String,
  },
  data() {
    return {
      filters: [],
    };
  },
  mounted() {
    if (this.filterButtons) {
      // build buttons array
      this.filterButtons.forEach((filter) => {
        // check localstorage
        let active = false;
        if (localStorage.getItem(`${this.name}-filters`)) {
          const filters = JSON.parse(localStorage.getItem(`${this.name}-filters`));
          const keys = Object.keys(filters);
          if (keys.length > 0) {
            const values = Object.values(filters);
            const regex = new RegExp(this.filterButtons[0].field);

            keys.forEach((key, index) => {
              if (regex.test(key)) {
                console.log(key)
                if (typeof values[index] === 'string' && values[index].split(',').includes(filter.value.toString())) {
                  active = true;
                } else if (values[index] === filter.value) {
                  active = true;
                }
              }
            });
          }

        }

        const button = {
          value: filter.value,
          field: filter.field,
          name: filter.name,
          operator: filter.operator,
          active,
        };
        this.filters.push(button);
      });
      // fetch local storage
    }
  },
  methods: {
    // refresh ui
    clickFilter(button) {
      // console.log(button)
      this.filters.forEach((filter, i) => {
        if (filter.value === button.value && filter.field === button.field && filter.operator === button.operator) {
          this.filters[i].active = !filter.active;
          const operator = filter.operator ? filter.operator : 'eq';
          if (filter.active) {
            this.$parent.addFilter(filter.field, filter.value, operator);
          } else {
            this.$parent.removeFilter(filter.field, filter.value, operator);
          }
        }
      });
      this.refresh();
    },

    // update table
    refresh() {
      this.$parent.fetch();
    },

    reset() {
      // refresh ui
      this.filters.forEach((filter, i) => {
        this.filters[i].active = false;
      });
      // reset table
      this.$parent.reset();
      this.$parent.fetch();
    },
  },
}
</script>

<style scoped>

</style>
