export type PlotsCreateType = {
  features: Array<GeoJSON.Feature>;
  type: 'draw.create';
  target: Map;
};

export type Plot = {
  featureId: string
  plotcoordinations: number[][]
}