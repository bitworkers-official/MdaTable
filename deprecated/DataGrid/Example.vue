<template>
  <data-grid>
    <data-grid-row>
      <data-grid-cell heading>
        Name
      </data-grid-cell>
      <data-grid-cell heading>
        Price
      </data-grid-cell>
    </data-grid-row>
    <data-grid-row v-for="item in items" :key="item.name">
      <data-grid-cell-editable :value="item.name" />
      <data-grid-cell-editable :value="`${item.price}`" />
    </data-grid-row>
  </data-grid>
</template>

<script>
import DataGrid from './DataGrid.vue'
import DataGridCellEditable from './DataGridCellEditable.vue'
import DataGridCell from './DataGridCell.vue'
import DataGridRow from './DataGridRow.vue'

export default {
  components: {
    DataGrid,
    DataGridCell,
    DataGridRow,
    DataGridCellEditable,
  },
  data() {
    return {
      items: [
        {
          name: 'a',
          price: 10,
        },
        {
          name: 'b',
          price: 20,
        },
        {
          name: 'c',
          price: 30,
        },
      ],
    }
  },
}
</script>

<style>
.data-grid-cell {
  width: 150px;
}

* {
  box-sizing: border-box;
}
</style>
