import blessed from 'blessed';
import box from './styles/box';
import { cloneDeep } from 'lodash';

const loading = blessed.loading({
  ...cloneDeep(box),
  width: 'half',
  height: 'shrink',
  top: 'center',
  left: 'center',
  align: 'center'
});

export default loading;
