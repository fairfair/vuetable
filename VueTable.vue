<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <table-filters
          ref="filterComponent"
          :options="options"
      ></table-filters>
    </div>
    <div class="overflow-x-auto py-2">
      <div class="align-middle inline-block min-w-full">
        <div class="overflow-hidden rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th v-for="column in columns" :key="column.id" scope="col" class="px-6 pt-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="px-1">
                  {{ column.title }}
                </div>
              </th>
            </tr>
            <tr>
              <th v-for="column in columns" :key="column.id" scope="col" class="px-6 pb-3 text-left text-xs font-medium tracking-wider">
                <div class="mt-1" v-if="column.searchField">
                  <label for="email" class="sr-only">{{ column.title }}</label>
                  <input @keyup.enter="submitSearch(column.name, $event.target.value)" type="text" :name="column.name" class="py-1 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" :placeholder="column.title" />
                </div>
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="line in lines" :key="line.id" @click="redirect(line.order_id)" class="cursor-pointer hover:bg-indigo-50">
              <td v-for="column in columns" :key="column.id" class="px-6 py-4 whitespace-nowrap">
                <div v-if="column.kind === 'text'" class="text-gray-900">
                  {{ line[column.name] }}
                </div>

                <div v-if="column.kind === 'label'">
                  <span :class="`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-${showLabelLevel(line[column.name], column.enums)}-100 text-${showLabelLevel(line[column.name], column.enums)}-800`">
                   {{ showLabelContent(line[column.name], column.enums) }}
                  </span>
                </div>

                <div v-if="column.kind === 'date'" class="text-gray-900">
                  {{ getDate(line[column.name]) }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="">
      <table-pagination :pagination="pagination"></table-pagination>
    </div>
  </div>
</template>

<script>

import { DateTime } from 'luxon';

import TableFilters from './TableFilters.vue';
import TablePagination from './TablePagination.vue';

export default {
  components: {
    TableFilters,
    TablePagination,
  },
  props: {
    apiConfig: {
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      lines: [],
      filters: {
        prescriber_id: 1,
      },
      pagination: {
        currentPage: 1,
        from: 0,
        to: 0,
        total: 0,
        lastPage: 10,
      },
    };
  },
  async mounted() {
    // fetch from localStorage ?

    // todo : add this.options.defaultFilters

    await this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;

      // todo: save filters & currentPage in localstorage
      const prescriberKey = encodeURI('prescriber_id[eq]');
      const res = await this.$http.get(this.apiUrl, {
        params: {
          sortBy: 'order_id',
          orderBy: 'DESC',
          per_page: this.perPage,
          page: this.pagination.currentPage,
          [prescriberKey]: 1,
          // 'referent_id[eq]': 1,
        },
      });

      //         data: this.options.permanentFilters
      //  ? { ...this.options.permanentFilters, ...this.filters }
      //  : this.filters,

      if (res) {
        const lines = res.data.data;

        if (this.options.computedFields !== undefined) {
          this.lines = lines.map((line) => this.options.computedFields.order(line));
        } else {
          this.lines = lines;
        }

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

    submitSearch(payload) {
      // used in column search inputs

      // todo
      if (payload.value !== '') {
        this.filters[payload.field] = payload.value;
      } else {
        delete this.filters[payload.field];
      }

      this.fetch();
    },

    navigate(to) {
      this.pagination.currentPage = to;
      this.fetch();
    },

    resetTable() {
      this.filters = {};
      this.pagination.currentPage = 1;
      this.fetch();
      this.$emit('resetTable');
    },

    redirect(id) {
      this.$router.push({ name: this.options.onRowClicked, params: { id } });
    },

    // DISPLAY METHODS

    showLabelContent(val, arr) {
      const obj = JSON.parse(arr).find((i) => i.value === parseInt(val, 10));
      return (obj) ? obj.text : 'Devis refusé';
    },

    showLabelLevel(val, arr) {
      const obj = JSON.parse(arr).find((i) => i.value === parseInt(val, 10));
      return (obj) ? obj.level : 'gray';
    },

    getDate(value) {
      if (value) {
        const date = DateTime.fromSQL(value, { zone: 'utc' }).setZone('Europe/Paris');
        return date.toLocaleString(DateTime.DATETIME_MED);
      }
      return '';
    },
  },
}
</script>
