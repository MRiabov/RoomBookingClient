export class Room {
  id!: number;
  name!: string;
  location!: string;
  capacities!: Array<LayoutCapacity>

  constructor(id?: number, name?: string, location?: string, capacities?: Array<LayoutCapacity>) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (location) this.location = location;
    if (capacities) this.capacities = capacities;
  }


}

export class LayoutCapacity {
  id: number;
  layout: Layout;
  capacity: number;

  constructor(id: number, layout: Layout, capacity: number) {
    this.id = id;
    this.layout = layout;
    this.capacity = capacity;
  }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-shape',
  BOARD = 'Board Meeting'
}
