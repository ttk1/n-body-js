export class Vec3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public scale(s: number): Vec3 {
    return new Vec3(this.x * s, this.y * s, this.z * s);
  }

  public sub(a: Vec3): Vec3 {
    return new Vec3(this.x - a.x, this.y - a.y, this.z - a.z);
  }

  public add(a: Vec3): Vec3 {
    return new Vec3(this.x + a.x, this.y + a.y, this.z + a.z);
  }

  public length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
}
