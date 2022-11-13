import { Settings } from '../settings';
import { CONST } from './icon.constant';

// Constants -----------------------------------------------------------------

export function getBackgroundTopLeftPath(settings: Settings): string {
  return settings.backgroundTopLeft
    ? `C 0 ${CONST.B_DELTA} ${CONST.B_DELTA} 0 ${CONST.B_ROUND} 0`
    : `L 0 ${CONST.S_ROUND} C 0 ${CONST.S_DELTA} ${CONST.S_DELTA} 0 ${CONST.S_ROUND} 0 L ${CONST.B_ROUND} 0`;
}
export function getBackgroundTopRightPath(settings: Settings): string {
  return settings.backgroundTopRight
    ? `C ${CONST.SIZE - CONST.B_DELTA} 0 ${CONST.SIZE} ${CONST.B_DELTA} ${
        CONST.SIZE
      } ${CONST.B_ROUND}`
    : `L ${CONST.SIZE - CONST.S_ROUND} 0 C ${CONST.SIZE - CONST.S_DELTA} 0 ${
        CONST.SIZE
      } ${CONST.S_DELTA} ${CONST.SIZE} ${CONST.S_ROUND} L ${CONST.SIZE} ${
        CONST.B_ROUND
      }`;
}
export function getBackgroundBottomRightPath(settings: Settings): string {
  return settings.backgroundBottomRight
    ? `C ${CONST.SIZE} ${CONST.SIZE - CONST.B_DELTA} ${
        CONST.SIZE - CONST.B_DELTA
      } ${CONST.SIZE} ${CONST.B_ROUND} ${CONST.SIZE}`
    : `L ${CONST.SIZE} ${CONST.SIZE - CONST.S_ROUND} C ${CONST.SIZE} ${
        CONST.SIZE - CONST.S_DELTA
      } ${CONST.SIZE - CONST.S_DELTA} ${CONST.SIZE} ${
        CONST.SIZE - CONST.S_ROUND
      } ${CONST.SIZE} L ${CONST.B_ROUND} ${CONST.SIZE}`;
}
export function getBackgroundBottomLeftPath(settings: Settings): string {
  return settings.backgroundBottomLeft
    ? `C ${CONST.B_DELTA} ${CONST.SIZE} 0 ${CONST.SIZE - CONST.B_DELTA} 0 ${
        CONST.B_ROUND
      }`
    : `L ${CONST.S_ROUND} ${CONST.SIZE} C ${CONST.S_DELTA} ${CONST.SIZE} 0 ${
        CONST.SIZE - CONST.S_DELTA
      } 0 ${CONST.SIZE - CONST.S_ROUND} L 0 ${CONST.B_ROUND}`;
}

export function getShapePath(settings: Settings): string {
  return settings.shapeGap
    ? // Gap: only the dialog shape
      'M1211 1450c258-57 445-226 445-426 0-246-283-446-633-446s-633 200-633 446c0 199 184 367 439 425 26 9 51 18 74 31 33 18 65 39 96 60h1c55 37 110 73 172 93-1-13-5-28-8-45-9-36-18-77-3-103 10-17 29-27 50-35Z'
    : // No gap: a whole shape with dialog and fish tail
      'm1348 348 26-35a917 917 0 0 0-502 227c-35 28-74 53-113 79-218 70-369 225-369 405 0 199 184 367 439 425 26 9 51 18 74 31 33 18 65 39 96 60h1c55 37 110 73 172 93-1-13-5-28-8-45-9-36-18-77-3-103 10-17 29-27 50-35 128-28 239-84 317-157 25-22 68-27 103-18 28 7 62 40 84 63l18 18c54 52 110 101 173 142-56-203-99-393-78-606 6-58 20-115 35-171v-1c11-45 22-91 29-137a989 989 0 0 0-285 269 530 530 0 0 0-237-201c-67-36-79-53-98-119-10-71 35-129 76-184Z';
}

function getCirclePath(size: number): string {
  const half = size / 2;
  return `a ${half} ${half} 0 1 1-${size} 0 ${half} ${half} 0 0 1 ${size} 0`;
}

export function getEyePath(settings: Settings): string {
  if (settings.eyeEnabled) {
    const circle = getCirclePath(settings.eyeSize);
    return `M ${settings.eyeX} ${settings.eyeY} ${circle} Z`;
  } else {
    return '';
  }
}

export function getDotsPaths(settings: Settings): Array<string> {
  if (settings.dotsEnabled) {
    const circle = getCirclePath(settings.dotsSize);
    const nextX = settings.dotsSize + settings.dotsGap;

    return [
      `M ${settings.dotsX} ${settings.dotsY} ${circle} Z`,
      `m ${nextX} 0 ${circle} Z`,
      `m ${nextX} 0 ${circle} Z`,
    ];
  } else {
    return [];
  }
}
