import {values} from './values';

export const FastTrack = {
  PAGING: 'paging',
  GOTO: 'goto',
  OFF: null
};

FastTrack.values = values(FastTrack);
Object.freeze(FastTrack);
