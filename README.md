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
    enums: JSON.stringify(enums.ORDER_STATUS),
}
```

exemple of status object, for labelled items (store in enums in above example):
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
- filterButtons: array of filters selectable (displayed on the top of the table), see status object above
- defaultFilters: object of filters set until reset
- permanentFilters: object of filters set for every request
- onRowClicked: target component if a row is clicked

## Todo

- refresh ui according to localstorage config
- add bootstrap compatibility
