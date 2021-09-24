<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <table-filters
        ref="filterComponent"
        :filterButtons="options.filterButtons"
        :cssFramework="cssFramework"
      ></table-filters>
    </div>
    <div class="overflow-x-auto py-2">
      <div class="align-middle inline-block min-w-full">
        <div class="overflow-hidden rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th v-for="column in columns" :key="column.id" scope="col" :class="style[cssFramework].col.main">
                <div role="button" :class="style[cssFramework].col.click" @click="submitSort(column)">
                  <div class="mx-1">
                    <span :class="style[cssFramework].col.name">{{ column.name }}</span>
                  </div>
                  <svg :width="style[cssFramework].size.svg_width" :height="style[cssFramework].size.svg_height" v-show="orderBy === 'ASC' && sortBy === column.field" :class="style[cssFramework].arrow.svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                  <svg :width="style[cssFramework].size.svg_width" :height="style[cssFramework].size.svg_height" v-show="orderBy === 'DESC' && sortBy === column.field" :class="style[cssFramework].arrow.svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
              </th>
            </tr>
            <tr>
              <th v-for="column in columns" :key="column.id" scope="col" class="px-6 pb-3 text-left text-xs font-medium tracking-wider">
                <div class="mt-1" v-if="column.searchField">
                  <label :for="column.field" class="sr-only">{{ column.name }}</label>
                  <input @keyup.enter="submitSearch(column, $event.target.value)" :id="column.field" type="text" :name="column.field" class="py-1 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Rechercher" />
                </div>
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-if="lines.length > 0">
            <tr v-for="line in lines" :key="line.id" @click="redirect(line.order_id)" class="cursor-pointer hover:bg-indigo-50">
              <td v-for="column in columns" :key="column.id" class="px-6 py-4 whitespace-nowrap">
                <div v-if="column.kind === 'text'" class="text-gray-900">
                  {{ line[column.field] }}
                </div>

                <div v-if="column.kind === 'label'">
                  <span :class="`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-${showLabelColor(line[column.field], column.enums)}-100 text-${showLabelColor(line[column.field], column.enums)}-800`">
                   {{ showLabelContent(line[column.field], column.enums) }}
                  </span>
                </div>

                <div v-if="column.kind === 'date'" class="text-gray-900">
                  {{ getDate(line[column.field]) }}
                </div>
              </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
              <td :colspan="columns.length" class="p-3 text-center">
                <span class="">Aucun résultat</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <table-pagination
        :pagination="pagination"
        :cssFramework="cssFramework"
      />
    </div>
  </div>
</template>

<script>

import { DateTime } from 'luxon';

import TableFilters from './TableFilters.vue';
import TablePagination from './TablePagination.vue';
import style from './style'

export default {
  components: {
    TableFilters,
    TablePagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: false,
    },
    cssFramework: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      style,
      loading: false,
      lines: [],
      filters: {},
      orderBy: null,
      sortBy: null,
      perPage: null,
      pagination: {
        currentPage: 1,
        from: 0,
        to: 0,
        total: 0,
        lastPage: 1,
      },
    };
  },
  async mounted() {
    // actually set all params
    this.reset();

    // if localStorage : fetch it
    if (localStorage.filters || localStorage.sortBy || localStorage.orderBy) {
      if (localStorage.filters) this.filters = JSON.parse(localStorage.filters);
      if (localStorage.sortBy) this.sortBy = localStorage.sortBy;
      if (localStorage.orderBy) this.orderBy = localStorage.orderBy;
    } else if (this.options.defaultFilters !== undefined) {
      this.filters = this.options.defaultFilters;
    }

    await this.fetch();
  },

  methods: {
    async fetch() {
      this.loading = true;

      // save params in localstorage
      localStorage.setItem('filters', JSON.stringify(this.filters));
      localStorage.setItem('sortBy', this.sortBy);
      localStorage.setItem('orderBy', this.orderBy);

      const defaultParams = {
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        per_page: this.perPage,
        page: this.pagination.currentPage,
      };

      const filters = this.options.permanentFilters
        ? { ...this.options.permanentFilters, ...this.filters }
        : this.filters;

      const params = new URLSearchParams();
      Object.keys(defaultParams).forEach((key) => {
        params.append(key, defaultParams[key]);
      });

      Object.keys(filters).forEach((key) => {
        const values = filters[key].toString().split(',');
        values.forEach((value) => {
          params.append(key, value);
        });
      });

      const res = await this.$http.get(this.apiUrl, { params });

      if (res) {
        this.lines = res.data.data;
        this.pagination = {
          currentPage: res.data.current_page,
          from: res.data.from,
          to: res.data.to,
          total: res.data.total,
          lastPage: res.data.last_page,
        };
      }

      this.loading = false;
    },

    addFilter(field, value, query) {
      const key = `${field}[${query}]`;
      if (key in this.filters) {
        this.filters[key] += `,${value}`;
      } else {
        this.filters[key] = value;
      }
    },

    removeFilter(field, value, query) {
      const key = `${field}[${query}]`;
      if (key in this.filters) {
        const values = this.filters[key].toString().split(',');
        const newValues = [];
        if (values.length > 1) {
          values.forEach((filter) => {
            if (filter !== value.toString()) {
              newValues.push(filter);
            }
          });
          this.filters[key] = newValues.join();
        } else {
          delete this.filters[key];
        }
      }
    },

    // used in column search inputs
    submitSearch(column, value) {
      const query = (column.kind === 'id') ? 'eq' : 'contains';
      this.removeFilter(column.field, value, query);
      if (value !== '') {
        this.addFilter(column.field, value, query);
      }

      this.fetch();
    },

    submitSort(column) {
      this.sortBy = column.field;
      if (this.orderBy === 'ASC') {
        this.orderBy = 'DESC';
      } else {
        this.orderBy = 'ASC';
      }
      this.fetch();
    },

    navigate(to) {
      this.pagination.currentPage = to;
      this.fetch();
    },

    reset() {
      this.filters = {};
      this.sortBy = this.options.sortBy !== undefined ? this.options.sortBy : this.columns[0].field;
      this.orderBy = this.options.orderBy !== undefined ? this.options.orderBy : 'DESC';
      this.perPage = this.options.perPage !== undefined ? this.options.perPage : 20;
      this.pagination.currentPage = 1;
    },

    redirect(id) {
      if (this.options.onRowClicked !== undefined) {
        this.$router.push({ name: this.options.onRowClicked, params: { id } });
      }
    },

    // DISPLAY METHODS

    showLabelContent(val, arr) {
      const obj = arr.find((i) => i.value === parseInt(val, 10));
      return (obj) ? obj.name : 'NR';
    },

    showLabelColor(val, arr) {
      const obj = arr.find((i) => i.value === parseInt(val, 10));
      return (obj) ? obj.color : 'gray';
    },

    getDate(value) {
      if (value) {
        const date = DateTime.fromISO(value, { zone: 'utc' }).setZone('Europe/Paris');
        return date.toLocaleString(DateTime.DATETIME_MED);
      }
      return '';
    },
  },
}
</script>
