import screen from '../../screen';
import menu from '../menu';
import { cloneDeep } from 'lodash';

export default () => cloneDeep({
  top: 0,
  left: 0,

  width: '100%',
  height: screen.height - menu.height,

  mouse: true,
  keys: true,
  vi: true,

  keyable: true,
  input: true,

  border: {
    type: 'line'
  },

  style: {
    border: {
      fg: 'gray'
    },

    scrollbar: {
      bg: 'blue'
    },

    focus: {
      border: {
        fg: 'blue'
      }
    },

    selected: {
      bg: 'cyan',
      fg: 'black'
    }
  }
});
