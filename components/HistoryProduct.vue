<script setup>
import { Bar,Line } from "vue-chartjs";

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});


onBeforeMount(() => {
  console.log("chartData", props.chartData);
});

</script>

<template>
  <div class="history-product">
    <Line :data="chartData" 
          :options="{ responsive: true, maintainAspectRatio: false, scales: {
      x: {
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          callback: function(val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          },
          color: 'red',
        }
      }
    } }"
    />
  </div>
</template>

<style scoped>
.history-product {
  width: 100%;
  height: 400px;
}
</style>
