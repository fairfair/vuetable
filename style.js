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
    col2: {
      main: 'px-6 pb-3 text-left text-xs font-medium tracking-wider',
    },
    overflow: 'overflow-x-auto py-2',
    inline: 'align-middle inline-block min-w-full',
    overflow_hidden: 'overflow-hidden rounded-lg',
    table: 'min-w-full divide-y divide-gray-200 border border-gray-200',
    tbody: {
      main: 'bg-white divide-y divide-gray-200',
    },
    tr: {
      line: 'cursor-pointer hover:bg-indigo-50',
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
    col2: {
      main: 'px-1 pb-2',
    },
    overflow: 'overflow-auto py-2',
    inline: 'align-middle d-inline-block w-100',
    overflow_hidden: 'overflow-hidden rounded-lg',
    table: 'table',
    tbody: {
      main: 'border border-top-2',
    },
    tr: {
      line: '',
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
