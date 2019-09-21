import { Vec3 } from './vec3';

export class Particle {
  public p: Vec3;
  public v: Vec3;
  public a: Vec3;
  public m: number;

  constructor(p: Vec3, v: Vec3, a: Vec3, m: number) {
    this.p = p;
    this.v = v;
    this.a = a;
    this.m = m;
  }
}
