import {values} from './values';

export const ScrollKey = {
  HOME: 36,
  END: 35,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

ScrollKey.values = values(ScrollKey);
Object.freeze(ScrollKey);
