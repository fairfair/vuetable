<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class=" py-3 flex items-center justify-between">
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="previous"
      >
        Précédent
      </a>
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="next"
      >
        Suivant
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-400">
          Affichage de
          {{ ' ' }}
          <span class="font-medium">{{ pagination.to === 0 ? 0 : pagination.from }}</span>
          {{ ' ' }}
          à
          {{ ' ' }}
          <span class="font-medium">{{ pagination.to }}</span>
          {{ ' ' }}
          des
          {{ ' ' }}
          <span class="font-medium">{{ pagination.total }}</span>
          {{ ' ' }}
          lignes
        </p>
      </div>
      <div>
        <nav
          v-if="pagination.lastPage !== 1"
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px dark:bg-gray-800"
          aria-label="Pagination"
        >
          <a
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300  text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click="previous(1)"
          >
            <span class="sr-only">Précédent</span>
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            /></svg>
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->

          <a
            v-show="pagination.currentPage > 2"
            href="#"
            class=" border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="previous(2)"
          >
            {{ pagination.currentPage - 2 }}
          </a>
          <a
            v-show="pagination.currentPage > 1"
            href="#"
            class="  border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="previous(1)"
          >
            {{ pagination.currentPage - 1 }}
          </a>
          <a
            href="#"
            aria-current="page"
            class="z-10 dark:bg-gray-800  bg-indigo-50 border-indigo-500 text-indigo-600 dark:text-indigo-500/70 dark:border-indigo-500/70 dark:border-2 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            {{ pagination.currentPage }}
          </a>
          <a
            v-show="pagination.currentPage < pagination.lastPage"
            href="#"
            class=" border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            @click="next(1)"
          >
            {{ pagination.currentPage + 1 }}
          </a>
          <a
            v-show="pagination.currentPage + 1 < pagination.lastPage"
            href="#"
            class=" border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            @click="next(2)"
          >
            {{ pagination.currentPage + 2 }}
          </a>
          <a
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300  text-sm font-medium text-gray-500 hover:bg-gray-50"
            @click="next(1)"
          >
            <span class="sr-only">Suivant</span>
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            /></svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';

export default {
  props: {
    pagination: Object,
  },
  methods: {
    previous(number) {
      if (this.pagination.currentPage > number) {
        this.$parent.navigate(this.pagination.currentPage - number);
      }
    },
    next(number) {
      if (this.pagination.currentPage + number - 1 < this.pagination.lastPage) {
        this.$parent.navigate(this.pagination.currentPage + number);
      }
    },
  },
};

</script>
