import type {
  FolderNode,
  PlacemarkNode,
} from "@/types/kml";

export interface IndexedPlacemark {

  id: string;

  name: string;

  geometryType: string;

  lat: number;

  lng: number;

  source: PlacemarkNode;

}

export class GeometryIndex {

  private items: IndexedPlacemark[] = [];

  addFolder(
    folder: FolderNode
  ) {

    for (const placemark of folder.placemarks) {

      this.addPlacemark(
        placemark
      );

    }

    for (const child of folder.folders) {

      this.addFolder(child);

    }

  }

  addPlacemark(
    placemark: PlacemarkNode
  ) {

    const first =
      placemark.geometry.coordinates
        .trim()
        .split(/\s+/)[0];

    if (!first)
      return;

    const [lng, lat] =
      first.split(",").map(Number);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {

      return;

    }

    this.items.push({

      id: placemark.id,

      name: placemark.name,

      geometryType:
        placemark.geometryType,

      lat,

      lng,

      source: placemark,

    });

  }
    search(
    query: string
  ) {

    const q =
      query.trim().toLowerCase();

    if (!q)
      return this.items;

    return this.items.filter(
      item =>
        item.name
          .toLowerCase()
          .includes(q)
    );

  }

  withinRadius(

    lat: number,

    lng: number,

    radiusKm: number

  ) {

    return this.items.filter(
      item => {

        const dLat =
          (item.lat - lat) *
          (Math.PI / 180);

        const dLng =
          (item.lng - lng) *
          (Math.PI / 180);

        const a =

          Math.sin(dLat / 2) ** 2 +

          Math.cos(lat * Math.PI / 180) *

          Math.cos(item.lat * Math.PI / 180) *

          Math.sin(dLng / 2) ** 2;

        const c =
          2 *
          Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
          );

        const distance =
          6371 * c;

        return (
          distance <= radiusKm
        );

      }
    );

  }

  getAll() {

    return [...this.items];

  }

  clear() {

    this.items = [];

  }

}