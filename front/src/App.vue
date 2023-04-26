<script setup lang="ts">
import {
  MapboxDrawControl,
  MapboxGeogeometryPolygon,
  MapboxMap,
  MapboxMarker,
} from "vue-mapbox-ts";
import { PlotsCreateType } from "./types/create";
import { usePlotsStore } from "./store/plots";
import { computed } from "vue";

const token: string = import.meta.env.VITE_MAP_TOKEN;

const plotsStore = usePlotsStore();

const allPlots = computed(() => {
  return plotsStore.plots.map((plot: any) => {
    return plot.geometry.coordinates;
  });
});

const createNewPoint = (point: PlotsCreateType) => {
  console.log(point);
  plotsStore.createNewPlot(point.features);
};

const updatePlot = (plot: any) => {
  // todo: update
  console.log(plot);
};
</script>

<template>
  <div class="mapBox">
    <MapboxMap :accessToken="token">
      <MapboxMarker :lngLat="[41.63, 41.63]"> </MapboxMarker>

      <MapboxDrawControl @create="createNewPoint" @update="updatePlot" />
      <MapboxGeogeometryPolygon v-for="path in allPlots" :path="path" />
    </MapboxMap>
  </div>
</template>
<style scoped>
.mapBox {
  height: 700px;
}
</style>
