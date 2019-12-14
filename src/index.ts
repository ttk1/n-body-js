import { Particle } from './particle';
import { Vec3 } from './vec3';

// 質点数
const N = 1024;
// 万有引力定数
const G = 6.67408e-11;
// 時間の刻み幅
const TIME_STEP = 0.5;

function getParticles() {
  const particles: Particle[] = [];
  for (let i = 0; i < N; i++) {
    particles.push(getParticle());
  }
  return particles;
}

function getParticle() {
  const p = new Vec3(Math.random(), Math.random(), 0.0);
  const v = new Vec3(0.0, 0.0, 0.0);
  const a = new Vec3(0.0, 0.0, 0.0);
  const m = 1.0e+2;
  return new Particle(p, v, a, m);
}

window.onload = () => {
  // キャンバスの初期化
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // 質点の初期化
  let particles = getParticles();

  // 実行開始
  step();

  function step() {
    const tmp: Particle[] = [];
    // 質点を順番に処理
    for (let i = 0; i < N; i++) {
      const pi = particles[i];
      let force = new Vec3(0.0, 0.0, 0.0);

      // 万有引力計算
      for (let j = 0; j < N; j++) {
        if (i === j) {
          continue;
        }
        const pj = particles[j];
        const relative = pj.p.sub(pi.p);
        const norm = relative.length();
        // 近すぎる時に、強烈に加速するのを防止する
        if (norm > 0.01) {
          const invnorm = 1.0 / Math.pow(norm, 3.0);
          force = force.add(relative.scale(G * pj.m * invnorm));
        }
      }

      // リープフロッグ法で質点の情報を更新
      const middle = pi.v.add(pi.a.scale(TIME_STEP / 2.0));
      const new_a = force.scale(1.0);
      const new_p = pi.p.add(middle.scale(TIME_STEP));
      const new_v = pi.v.add(new_a.scale(TIME_STEP / 2.0));
      tmp[i] = new Particle(new_p, new_v, new_a, pi.m);
    }
    particles = tmp;

    // 質点の描画
    refresh();
    particles.forEach((particle) => {
      drawParticle(particle);
    });
    setTimeout(step, 5);
  }

  function drawParticle(particle: Particle) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
      500 * particle.p.x,
      500 * particle.p.y,
      3.0, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  function refresh() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 500);
  }
};
