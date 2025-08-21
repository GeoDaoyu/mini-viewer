export interface LayerProperties {
  url: string;
  id: string;
  title?: string;
}

export default class MapImageLayer {
  url: string;
  id: string;
  title?: string;

  constructor(properties: LayerProperties) {
    this.url = properties.url;
    this.id = properties.id;
    this.title = properties.title;
  }
}
