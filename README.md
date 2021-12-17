# VueTable Component

## Note 

To update all submodules :
```
git submodule foreach git pull origin main
```

## Requirements

- Vue 2 or 3
- Tailwindcss
- Axios as global instance called $http

## API

### Default values

- perPage : 20
- sortBy : first column
- orderBy : DESC

### Required props

- name: name of the table (used for localstorage)
- apiUrl: api endpoint
- columns: array of columns to display in the table

example of column object:
```
{
    name: 'Statut', // required: column title
    field: 'order_status', // required: database field name (accept callback)
    searchField: true,
    type: 'badge',
    badgeOptions: [
        {
            name: 'A proposer',
            field: 'order_status',
            value: 0,
            color: 'red',
            colors: { // NEW OPTION (no breaking change) => Custom background & text colors in order to add full classnames for tailwindcss purge
                background: 'bg-red-100',
                text: 'text-red-800',
            }
        },
        { ... },
    ], 
}
```

Note about type options: 
- text (default) : use 'contains' operator in queries 
- id : use 'eq' operator in queries
- date & age : format value as human readable data
- duration-day : Convert seconds integer into days integer
- badge : display a label according to badgeOptions if exist, show field value else


### Optional props: options object, with following keys

- perPage: number of lines displayed per page
- orderBy : only value accepted is 'ASC' (default 'DESC')
- sortBy : field to sort data
- filterButtons: array of filters clickable, see labelled item above
- defaultFilters: object of filters set until reset, see api doc for syntax
- permanentFilters: object of filters set for every request, see api doc for syntax
- onRowClicked: object with two params,
  - field: field used as param for redirection (default is first column)
  - page: target component name ; if undefined, an event 'on-row-clicked' is emitted with field value


