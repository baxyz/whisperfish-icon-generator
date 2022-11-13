import { Settings } from '../settings';

export const CONST = {
  SIZE: 2048,

  // Small round
  S_ROUND: 34,
  S_DELTA: 15,

  // Big round (half the size)
  B_ROUND: 1024,
  B_DELTA: 458,
};

export const REPAINT_BACKGROUND_SHAPE_PROPERTIES: Array<keyof Settings> = [
  'backgroundTopLeft',
  'backgroundTopRight',
  'backgroundBottomLeft',
  'backgroundBottomRight',
];

export const REPAINT_SHAPE_SHAPE_PROPERTIES: Array<keyof Settings> = [
  'shapeGap',
  'shapeColor',
  'eyeEnabled',
  'eyeSize',
  'eyeX',
  'eyeY',
  'dotsEnabled',
  'dotsSize',
  'dotsX',
  'dotsY',
  'dotsGap',
];
