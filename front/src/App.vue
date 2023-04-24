<script setup lang="ts">
import { MapboxMap } from "vue-mapbox-ts";
const token:string = import.meta.env.VITE_MAP_TOKEN;
</script>

<template>
  <MapboxMap :accessToken="token"></MapboxMap>
</template>
