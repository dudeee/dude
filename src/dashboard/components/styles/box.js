import screen from '../../screen';
import menu from '../menu';

export default {
  top: 0,
  left: 0,

  width: '100%',
  height: screen.height - menu.height,

  mouse: true,
  keys: true,
  vi: true,

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
    }
  }
};
