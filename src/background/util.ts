const PARALLAX_RATIO = 1 / 3;

export function initCtx(
  canvasId: string,
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.getElementById(canvasId);
  if (!(canvas instanceof HTMLCanvasElement))
    throw new Error(`Could not find a canvas with id: '${canvasId}'`);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error(`Could not get context for canvas '${canvasId}'`);

  const parent = canvas.parentElement;
  if (parent) {
    const resizeCanvas = () => {
      const contentElement = document.getElementById("content");
      if (!contentElement) throw new Error("Count not find content element");
      const contentHeight = contentElement.clientHeight;
      const parentHeight = parent.clientHeight;

      canvas.style.height = `${parentHeight + (contentHeight - parentHeight) * PARALLAX_RATIO}px`;

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  return [canvas, ctx];
}

export class Vector {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {}
  public copy(): Vector {
    return new Vector(this.x, this.y);
  }
  public magnitude(): number {
    return Math.hypot(this.x, this.y);
  }
  public direction(): number {
    return Math.atan2(this.x, this.y);
  }
  public scale(n: number): Vector {
    this.x *= n;
    this.y *= n;
    return this;
  }
  public add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  public subtract(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  public normalize(): Vector {
    const len = this.magnitude();
    if (len != 0) {
      this.x /= len;
      this.y /= len;
    }
    return this;
  }
  public getOrth(): Vector {
    return new Vector(this.y, -this.x);
  }
  public getRotated(angle: number): Vector {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Vector(c * this.x - s * this.y, s * this.x + c * this.y);
  }
  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }
}

/** Clamp angle within [-pi, pi) */
export function clampAngle(angle: number) {
  return ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
}

/** Random float between [low, high) */
export function randFloat(low: number, high: number) {
  return Math.random() * (high - low) + low;
}

/** Random integer between [low, high) */
export function randInt(low: number, high: number) {
  return Math.floor(randFloat(low, high));
}

export function randBool() {
  return randFloat(0, 1) < 0.5;
}
