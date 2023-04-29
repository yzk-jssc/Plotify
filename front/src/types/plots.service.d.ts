export type PlotRequestData = {
  featureId: string;
  zoom: number;
  feature: GeoJSON.Feature;
};

export type PlotResponseData = {
  id: number;
  attributes: {
    featureId: string;
    zoom: number;
    feature: GeoJSON.Feature;
  };
};
