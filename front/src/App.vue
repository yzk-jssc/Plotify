<script setup lang="ts">
import { MapboxDrawControl, MapboxMap, MapboxMarker } from "vue-mapbox-ts";
import { Xt } from './types/create'

const token: string = import.meta.env.VITE_MAP_TOKEN;

const createNewPoint = (point: Xt) => {
  console.log(point.features)
}

</script>

<template>
  <div class="mapBox">
    <MapboxMap :accessToken="token">
      <MapboxMarker :lngLat="[41.63, 41.63]">
        <MapboxDrawControl @create="createNewPoint"/>
      </MapboxMarker>
    </MapboxMap>
  </div>
</template>
<style scoped>
.mapBox {
  height: 700px;
}
</style>
