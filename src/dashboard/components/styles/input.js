import { cloneDeep } from 'lodash';

export default () => cloneDeep({
  height: 3,

  mouse: true,
  keys: true,
  vi: true,
  inputOnFocus: true,

  border: {
    type: 'line',
  },

  style: {
    border: {
      fg: 'gray',
    },
    focus: {
      border: {
        fg: 'blue',
      },
    },
  },
});
