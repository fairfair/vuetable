# VueTable Component

## Requirements

- Vue 2
- Tailwindcss
- Use axios with global instance called $http

## API

### Default values

- perPage : 20
- sortBy : first columnn
- orderBy : DESC

### Required props

- apiUrl: api endpoint
- columns: array of columns to display in the table

exemple of column object:
```
{
    name: 'Statut', // title displayed in the table
    field: 'order_status', // database field name
    kind: 'label', // also available : id, text & date
    searchField: true,
    enums: enums.ORDER_STATUS, // optionnal, used for labelled items
}
```

exemple of labelled item object:
```
{
    name: 'A proposer',
    field: 'order_status',
    value: 0,
    color: 'red',
}
```

### Optional props: options object, with following keys

- perPage: number of lines displayed per page
- orderBy : only value accepted is 'ASC' (default 'DESC')
- sortBy : field to sort data
- filterButtons: array of filters clickable, see labelled item above
- defaultFilters: object of filters set until reset, see api doc for syntax
- permanentFilters: object of filters set for every request, see api doc for syntax
- onRowClicked: target component name if a row is clicked

## Todo

- refresh ui according to localstorage config
- add bootstrap compatibility
