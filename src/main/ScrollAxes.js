import {values} from './values';

export const ScrollAxes = {
  X: 'x',
  Y: 'y',
  XY: 'xy'
};

ScrollAxes.values = values(ScrollAxes);
Object.freeze(ScrollAxes);
