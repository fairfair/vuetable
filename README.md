# VueTable Component

## Config

- Vue 2
- Tailwindcss

## API

### Required props

- apiUrl: api endpoint
- columns: array of columns to display in the table
- sortBy: column used to sort data by (usually id)

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

exemple of status object (from enums):
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
- orderByDefault : order by ASC (default DESC)
- filterButtons: array of filters selectable (displayed on the top of the table)
- defaultFilters: object of filters set until reset
- permanentFilters: object of filters set for every request
- onRowClicked: target component if a row is clicked

## Todo

- add defaultFilters
- save params in localstorage : https://fr.vuejs.org/v2/cookbook/client-side-storage.html
- add bootstrap compatibility
