export type PlotsCreateType = {
  features: Array<GeoJSON.Feature>;
  type: 'draw.create';
  target: Map;
};