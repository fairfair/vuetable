<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white py-3 flex items-center justify-between">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#" @click="previous" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Précédent
      </a>
      <a href="#" @click="next" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Suivant
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Affichage de
          {{ ' ' }}
          <span class="font-medium">{{ pagination.to === 1 ? 0 : pagination.from }}</span>
          {{ ' ' }}
          à
          {{ ' ' }}
          <span class="font-medium">{{ pagination.to - 1 }}</span>
          {{ ' ' }}
          des
          {{ ' ' }}
          <span class="font-medium">{{ pagination.total }}</span>
          {{ ' ' }}
          lignes
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a href="#" @click="previous" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Précédent</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a href="#" @click="previous" v-show="pagination.currentPage > 1" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            {{ pagination.currentPage - 1 }}
          </a>
          <a href="#" aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            {{ pagination.currentPage }}
          </a>
          <a href="#" @click="next" v-show="pagination.currentPage < pagination.lastPage" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
            {{ pagination.currentPage + 1 }}
          </a>
          <a href="#" @click="next" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Suivant</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    pagination: Object,
  },
  methods: {
    previous() {
      this.$parent.navigate(this.pagination.currentPage - 1);
    },
    next() {
      this.$parent.navigate(this.pagination.currentPage + 1);
    },
  },
}

</script>
