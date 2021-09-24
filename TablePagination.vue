<template>
  <div :class="style[cssFramework].pagination.main">
    <div v-if="cssFramework === 'tailwind'" :class="style[cssFramework].pagination.responsive_tabs">
      <a href="#" @click="previous" :class="style[cssFramework].pagination.previous_button">
        Précédent
      </a>
      <a href="#" @click="next" :class="style[cssFramework].pagination.next_button">
        Suivant
      </a>
    </div>
    <div :class="style[cssFramework].pagination.sub_main">
      <div>
        <p class="text-sm text-gray-700">
          Affichage de
          {{ ' ' }}
          <span class="font-medium">{{ pagination.to === 1 ? 0 : pagination.from }}</span>
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
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a href="#" @click="previous" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Précédent</span>
            <svg :width="style[cssFramework].size.svg_width" :height="style[cssFramework].size.svg_height" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
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
            <svg :width="style[cssFramework].size.svg_width" :height="style[cssFramework].size.svg_height" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import style from './style'

export default {
  props: {
    pagination: Object,
    cssFramework: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      style,
    }
  },
  methods: {
    previous() {
      if (this.pagination.currentPage > 1) {
        this.$parent.navigate(this.pagination.currentPage - 1);
      }
    },
    next() {
      if (this.pagination.currentPage < this.pagination.lastPage) {
        this.$parent.navigate(this.pagination.currentPage + 1);
      }
    },
  },
}

</script>
