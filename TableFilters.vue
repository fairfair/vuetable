<template>
  <div class="flex justify-between align-items">
    <div class="my-auto">
      <div v-if="filters.length > 0">
        <div class="sm:hidden">
          <label
            for="tabs"
            class="sr-only"
          >Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
          >
            <option
              v-for="tab in filters"
              :key="tab.value"
              :selected="tab.active"
            >
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav
            class="flex space-x-3"
            aria-label="Tabs"
          >
            <a
              v-for="(tab, index) in filters"
              :key="index"
              :href="tab.href"
              :class="[tab.active ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-gray-500 dark:text-indigo-400/80' : 'bg-gray-100 text-gray-500 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-400', 'px-3 py-2 font-medium text-sm rounded-md cursor-pointer']"
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
        class="bg-red-100 p-2 mr-2 font-medium text-sm rounded-md cursor-pointer dark:bg-red-500/30 dark:text-red-500/80"
        @click="reset"
      >
        <svg
          class="w-6 h-6 text-red-500 hover:text-red-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <button
        class="bg-indigo-100 p-2 font-medium text-sm rounded-md cursor-pointer dark:bg-indigo-500/20 dark:text-indigo-600/80"
        @click="refresh"
      >
        <svg
          class="w-6 h-6 text-indigo-500 hover:text-indigo-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
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
    // build buttons array
    if (this.filterButtons) {
      this.filterButtons.forEach((filter) => {
        let active = false;
        // check localstorage
        if (localStorage.getItem(`${this.name}-filters`)) {
          const filters = JSON.parse(localStorage.getItem(`${this.name}-filters`));
          const keys = Object.keys(filters);
          if (keys.length > 0) {
            const values = Object.values(filters);
            keys.forEach((key, index) => {
              const regex = new RegExp(filter.field);
              if (regex.test(key)) {
                if (typeof values[index] === 'string' && values[index].split(',').includes(filter.value.toString())) {
                  active = true;
                } else if (values[index] === filter.value) {
                  active = true;
                }
              }
            });
          }
        }

        this.filters.push({
          value: filter.value,
          field: filter.field,
          name: filter.name,
          operator: filter.operator,
          active,
        });
      });
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
};
</script>

<style scoped>

</style>
