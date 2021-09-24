export default {
  tailwind: {
    size: {
      svg_width: null,
      svg_height: null,
    },
    col: {
      main: 'px-6 pt-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
      click: 'flex justify-between cursor-pointer',
      name: 'inline-block align-middle',
    },
    buttons_header: 'flex flex-end',
    arrow: {
      svg: 'w-5 h-5',
    },
    refresh: {
      button: 'bg-indigo-100 p-2 font-medium text-sm rounded-md cursor-pointer',
      svg: 'w-6 h-6 text-indigo-500 hover:text-indigo-700',
    },
    reset: {
      button: 'bg-red-100 p-2 mr-2 font-medium text-sm rounded-md cursor-pointer',
      svg: 'w-6 h-6 text-red-500 hover:text-red-700',
    },
    pagination: {
      main: 'bg-white py-3 flex items-center justify-between',
      responsive_tabs: 'flex-1 flex justify-between sm:hidden',
      previous_button: 'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
      next_button: 'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
      sub_main: 'hidden sm:flex-1 sm:flex sm:items-center sm:justify-between',
    },
  },
  bootstrap_v4: {
    size: {
      svg_width: 25,
      svg_height: 25,
    },
    col: {
      main: 'pt-2 text-left font-weight-bold text-secondary text-uppercase',
      click: 'd-flex justify-content-center align-middle',
      name: 'd-inline-block align-middle',
    },
    buttons_header: 'd-flex justify-content-start w-25 m-2',
    arrow: {
      svg: '',
    },
    refresh: {
      button: 'bg-light p-0 w-25',
      svg: 'text-info',
    },
    reset: {
      button: 'bg-light p-0 rounded-lg w-25',
      svg: 'text-danger',
    },
    pagination: {
      main: 'py-3 d-flex align-middle justify-content-between',
      responsive_tabs: 'd-flex justify-content-between',
      previous_button: 'relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-light text-secondary',
      next_button: 'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-light text-secondary',
      sub_main: 'd-flex align-middle justify-content-between w-100',
    },
  },
};
