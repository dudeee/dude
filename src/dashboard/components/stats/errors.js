import contrib from 'blessed-contrib';
import box from '../styles/box';
import { server } from '../../messenger';
import screen from '../../screen';

const errors = contrib.line({
  ...box(),
  xLabelPadding: 3,
  xPadding: 5,
  showLegend: true,
  wholeNumbersOnly: true,
  label: 'errors',
  width: '50%-1',
  height: '50%-1',
  top: '50%-1'
});

server.on('errors', (message, data) => {
  errors.setData(data);

  screen.render();
});

export default errors;
