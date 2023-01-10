export class Room {
  id: number;
  name: string;
  location: string;
  capacities: Array<LayoutCapacity>

  constructor(id: number, name: string, location: string, capacities: Array<LayoutCapacity>) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.capacities = capacities;
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
