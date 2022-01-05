<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto scrollbar">
      <table-filters
        v-if="options"
        ref="filterComponent"
        :name="name"
        :filter-buttons="options.filterButtons"
      />
    </div>
    <div class="overflow-x-auto py-2 scrollbar ">
      <div class="align-middle inline-block min-w-full">
        <div class="overflow-hidden rounded">
          <div
            v-if="loading"
            class="relative w-full bg-gray-200 dark:bg-gray-800"
          >
            <div
              style="width: 100%"
              class="absolute top-0 h-1 shim"
            />
          </div>
          <div
            v-else
            class="h-1 bg-white dark:bg-gray-800"
          />

          <table class="min-w-full divide-y divide-gray-200 border border-gray-200 dark:border-gray-600 dark:bg-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.id"
                  scope="col"
                  class="px-6 pt-3 text-left font-medium tracking-wider uppercase text-sm dark:text-gray-400"
                >
                  <div
                    class="flex justify-between cursor-pointer"
                    @click="submitSort(column)"
                  >
                    <div class="mx-1">
                      <span class="inline-block align-middle">{{ column.name }}</span>
                    </div>
                    <svg
                      v-show="orderBy === 'ASC' && sortBy === column.field"
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <svg
                      v-show="orderBy === 'DESC' && sortBy === column.field"
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.id"
                  scope="col"
                  class="px-6 pb-3 text-left text-xs font-medium tracking-wider"
                >
                  <div
                    v-if="column.searchField"
                    class="mt-1"
                  >
                    <label
                      :for="column.field"
                      class="sr-only"
                    >{{ column.name }}</label>
                    <input
                      :id="`input-${column.field}`"
                      :ref="`input-${column.field}`"
                      type="text"
                      :name="column.field"
                      placeholder="Rechercher"
                      class="py-1 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
                      @keyup.enter="submitSearch(column, $event.target.value)"
                    >
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              v-if="lines.length > 0"
              class="bg-white dark:bg-gray-700/40 divide-y border-t dark:text-gray-400 dark:divide-gray-600 border-none"
            >
              <tr
                v-for="line in lines"
                :key="line.id"
                class="hover:bg-indigo-50 dark:hover:bg-gray-800"
                :class="options && options.onRowClicked ? 'cursor-pointer' : ''"
                @click="redirect(line)"
              >
                <td
                  v-for="column in columns"
                  :key="column.id"
                  class="px-6 py-4 whitespace-nowrap"
                  :class="(line.work_name === 'Serrurerie') && (
                    (parseInt(getAgeObj(line.order_created_at).days, 10) === 0) &&
                    (parseInt(getAgeObj(line.order_created_at).hours, 10) === 0) &&
                    (parseInt(getAgeObj(line.order_created_at).minutes, 10) < 13) 
                    
                  ) ?  'bg-gray-200 dark:bg-gray-600/60' : null"
                > <!-- temporary background color class condition to prevent recent orders -->
                  <div
                    v-if="column.type === 'id'"
                    class="text-gray-900 dark:text-gray-400"
                  >
                    {{ line[column.field] }}
                  </div>

                  <div v-else-if="column.type === 'badge'">
                    <div v-if="column.badgeOptions">
                      <span 
                        :class="[`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium`,
                        !column.badgeOptions[0].colors ? `bg-${showBadge('color', line, column)}-100 text-${showBadge('color', line, column)}-800` : `${showBadgeColors(line, column)}` ]"
                      >
                        {{ showBadge('content', line, column) }}
                      </span>
                    </div>

                    <div v-else>
                      <span :class="`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 `">
                        {{ line[column.field] }}
                      </span>
                    </div>
                  </div>

                  <div
                    v-else-if="column.type === 'date'"
                    class="text-gray-900 dark:text-gray-400"
                  >
                    {{ getDate(line[column.field]) }}
                  </div>
                  <div
                    v-else-if="column.type === 'age'"
                    class="text-gray-900 badge"
                  >
                    {{ getAgeToString(line[column.field]) }}
                  </div>

                  <div
                    v-else-if="column.type === 'age-badge'"
                    class="text-gray-900 badge"
                    :class="getAgeColorBadge(line[column.field], line.order_status, line.order_end_initiator)"
                  >
                    {{ getAgeToString(line[column.field]) }}
                  </div>

                  <div
                    v-else-if="column.type === 'duration-days'"
                    class="text-gray-900"
                  >
                    {{ getDurationFromSecondsToDays(line[column.field]) }}
                  </div>

                  <div
                    v-else
                    class="text-gray-900 dark:text-gray-400"
                  >
                    {{ line[column.field] }}
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td
                  :colspan="columns.length"
                  class="p-3 text-center"
                >
                  <span class="dark:text-gray-400">Aucun résultat</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="">
      <table-pagination :pagination="pagination" />
    </div>
  </div>
</template>

<script>

import { DateTime, Interval } from 'luxon';

import TableFilters from './TableFilters.vue';
import TablePagination from './TablePagination.vue';

export default {
  components: {
    TableFilters,
    TablePagination,
  },
  props: {
    name: {
      type: String,
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
    options: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
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
    if (localStorage.getItem(`${this.name}-filters`)
      || localStorage.getItem(`${this.name}-sortBy`)
      || localStorage.getItem(`${this.name}-orderBy`)
    ) {
      if (localStorage.getItem(`${this.name}-filters`)) {
        this.filters = JSON.parse(localStorage.getItem(`${this.name}-filters`));
      }

      if (localStorage.getItem(`${this.name}-sortBy`)) {
        this.sortBy = localStorage.getItem(`${this.name}-sortBy`);
      }

      if (localStorage.getItem(`${this.name}-orderBy`)) {
        this.orderBy = localStorage.getItem(`${this.name}-orderBy`);
      }
    } else if (this.options.defaultFilters !== undefined) {
      this.filters = this.options.defaultFilters;
    }

    await this.fetch();
  },

  methods: {
    async fetch() {
      this.loading = true;

      // save params in localstorage
      localStorage.setItem(`${this.name}-filters`, JSON.stringify(this.filters));
      localStorage.setItem(`${this.name}-sortBy`, this.sortBy);
      localStorage.setItem(`${this.name}-orderBy`, this.orderBy);

      const defaultParams = {
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        perPage: this.perPage,
        per_page: this.perPage,
        page: this.pagination.currentPage,
      };

      const filters = this.options && this.options.permanentFilters
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

      try {
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
      } catch (e) {
        //
      } finally {
        this.loading = false;
      }
    },

    castValue(value) {
      if (value === true) {
        return 1;
      } if (value === false) {
        return 0;
      }
      return value;
    },

    addFilter(field, value, query) {
      const key = `${field}[${query}]`;
      const castedValueForBackend = this.castValue(value); // Fairfair Backend API can't treat boolean filter values (needs integers)
      if (key in this.filters) {
        this.filters[key] += `,${castedValueForBackend}`;
      } else {
        this.filters[key] = castedValueForBackend;
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
      const query = (column.type === 'id') ? 'eq' : 'contains';
      this.removeFilter(column.field, value, query);
      if (value !== '') {
        this.addFilter(column.field, value, query);
      }

      this.pagination.currentPage = 1;
      this.fetch();
    },

    submitSort(column) {
      this.sortBy = column.field;
      if (this.orderBy === 'ASC') {
        this.orderBy = 'DESC';
      } else {
        this.orderBy = 'ASC';
      }
      this.pagination.currentPage = 1;
      this.fetch();
    },

    navigate(to) {
      this.pagination.currentPage = to;
      this.fetch();
    },

    reset() {
      this.filters = {};
      this.sortBy = this.options && this.options.sortBy !== undefined ? this.options.sortBy : this.columns[0].field;
      this.orderBy = this.options && this.options.orderBy !== undefined ? this.options.orderBy : 'DESC';
      this.perPage = this.options && this.options.perPage !== undefined ? this.options.perPage : 20;
      this.pagination.currentPage = 1;
    },

    redirect(line) {
      if (this.options.onRowClicked !== undefined) {
        const id = (this.options.onRowClicked.field !== undefined)
          ? line[this.options.onRowClicked.field]
          : line[this.columns[0].field];

        if (this.options.onRowClicked.page !== undefined) {
          this.$router.push({ name: this.options.onRowClicked.page, params: { id } });
        } else {
          this.$emit('on-row-clicked', id);
        }
      }
    },

    // DISPLAY METHODS

    showBadge(type, line, column) {
      const field = (typeof column.field === 'function') ? column.field(line) : column.field;
      const res = column.badgeOptions.find((i) => i.value === line[field] && i.field === field)
      if (type === 'content') {
        return (res) ? res.name : 'NR';
      }
      return (res) ? res.color : 'gray';
    },
    showBadgeColors(line, column) {
      const field = (typeof column.field === 'function') ? column.field(line) : column.field;
      const res = column.badgeOptions.find((i) => i.value === line[field] && i.field === field)
      return (res) ? `${res.colors.background} ${res.colors.text}` : 'bg-gray-100 text-gray-600 dark:bg-gray-400 dark:text-gray-700';
    },


    getDate(value) {
      if (value) {
        const date = DateTime.fromISO(value, { zone: 'utc' }).setZone('Europe/Paris');
        return date.toLocaleString(DateTime.DATETIME_MED);
      }
      return '';
    },
    getAgeObj(value) {
      if (value) {
        const date = DateTime.fromISO(value, { zone: 'utc' });
        const dur = Interval.fromDateTimes(date, DateTime.local());
        if (dur.e) {
          return dur.toDuration(['months', 'days', 'hours', 'minutes']).toObject();
        }
      }
      return null;
    },
    getAgeToString(value) {
      if (value) {
        const age = this.getAgeObj(value);
        if (age) {
          // age string
          let res = ''
          if (age.months > 0) {
            res = `${age.months}m ${age.days}j`;
          } else {
            res += age.days !== 0 ? `${age.days}j ` : '';
            res += age.hours !== 0 ? `${age.hours}h ` : '';
            const minutes = parseInt(age.minutes, 10);
            if (minutes !== 0) {
              res += `${minutes}m`;
            } else {
              res += age.days === 0 && age.hours === 0 ? '< 1m' : '';
            }
          }
          return res;
        }
      }
      // else return empty string
      return '';
    },
    getAgeColorBadge(value, order_status, order_end_initiator) {
      let badgeColor = 'badge-red';
      const age = this.getAgeObj(value);
      if (age.days === 0) {
        if (age.hours < 3) {
          badgeColor = 'badge-green';
        } else if (age.hours >= 3 && age.hours <= 4) {
          badgeColor = 'badge-orange';
        } else {
          badgeColor = 'badge-red';
        }
      }
      if ((order_status >= 3) || order_end_initiator) { // Prevent danger badge for closed/canceled missions
        badgeColor = 'badge-gray';
      }
      return badgeColor;
    },
    getDurationFromSecondsToDays(value) {
      return value / (60 * 60 * 24);
    },
  },
};
</script>

<style scoped>

.shim {
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 255, 0.7);
}
.shim::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(233, 233, 233, 1) 0,
    rgba(233, 233, 233, 0.9) 50%,
    rgba(233, 233, 233, 0.8) 100%
  );
  animation: shimmer 3s ease-out infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(0%);
    opacity: 0;
  }
}

</style>
