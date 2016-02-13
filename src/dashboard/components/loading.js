import blessed from 'blessed';
import box from './styles/box';

const loading = blessed.loading({
  ...box(),
  width: 'half',
  height: 'shrink',
  top: 'center',
  left: 'center',
  align: 'center'
});

export default loading;
