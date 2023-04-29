<template>
  <div class="mapBox" ref="mapContainer"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { usePlotsStore } from "./store/plots";
import { PlotsCreateType } from "./types/create";

const token: string = import.meta.env.VITE_MAP_TOKEN;

const plotsStore = usePlotsStore();

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<mapboxgl.Map | null>(null);
const draw = ref<MapboxDraw | null>(null);

const getZoomLevel = computed((): number => {
  if (map.value) {
    const zoom = map.value.getZoom();
    return zoom;
  }
  return 0;
});

const createNewPoint = (point: GeoJSON.Feature) => {
  plotsStore.createNewPlot(point, getZoomLevel.value);
};

const allPlots = computed(() => {
  return plotsStore.plots;
});

onMounted(async () => {
  await plotsStore.getAllPlots();

  mapboxgl.accessToken = token;
  map.value = new mapboxgl.Map({
    container: mapContainer.value as HTMLElement,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [41.63, 41.63],
    zoom: 12,
  });

  draw.value = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
    },
  });

  map.value.addControl(draw.value);

  map.value.on("load", () => {
    if (allPlots.value.length > 0) {
      allPlots.value.forEach((plot: GeoJSON.Feature) => {
        map.value?.addSource(`plot-${plot.id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [plot],
          },
        });

        map.value?.addLayer({
          id: `plot-${plot.id}`,
          type: "fill",
          source: `plot-${plot.id}`,
          paint: {
            "fill-color": [
              "case",
              ["boolean", ["feature-state", "active"], false],
              "red",
              "blue",
            ],
            "fill-opacity": 0.5,
          },
          layout: {
            visibility: "visible",

          },
        });

        // Add click event listener to the layer

        // Set the initial state of the feature to 'active'
        map.value?.setFeatureState(
          { source: `plot-${plot.id}`, id: plot.id },
          { active: true, highlighted: true },
        );
      });
      
    }

    map.value?.on("draw.create", (event: PlotsCreateType) => {
      const point: GeoJSON.Feature = event.features[0];
      createNewPoint(point);
    });
  });
});
</script>

<style scoped>
.mapBox {
  height: 700px;
}
</style>
