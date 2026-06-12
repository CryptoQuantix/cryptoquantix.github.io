export interface PhysicsObject {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  color?: string;
  type: 'rectangle' | 'circle';
}

export enum GravityMode {
  NORMAL = 'NORMAL',
  ZERO = 'ZERO',
  REVERSE = 'REVERSE',
  MOON = 'MOON',
}

export interface GeminiResponse {
  concepts: string[];
}
