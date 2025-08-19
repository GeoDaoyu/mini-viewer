import DOMContainer, { DOMContainerProperties } from "./DOMContainer";

interface MapViewProperties extends DOMContainerProperties {}

export default class MapView extends DOMContainer {
  constructor(properties: MapViewProperties) {
    super(properties);
  }
}
