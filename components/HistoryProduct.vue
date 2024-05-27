<script setup>
import { Bar, Line } from "vue-chartjs";

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
    <Line :data="chartData" :options="{
      responsive: true, maintainAspectRatio: false, scales: {
        x: {
          ticks: {
            callback: function (val, index) {
              return index % 2 === 0 ? this.getLabelForValue(val) : '';
            },
            color: 'red',
          }
        }
      }
    }" />
  </div>
</template>

<style scoped>
.history-product {
  width: 100%;
  height: 400px;
}
</style>
