import contrib from 'blessed-contrib';
import box from '../styles/box';
import { server } from '../../messenger';
import screen from '../../screen';

const line = contrib.line({
  ...box(),
  xLabelPadding: 3,
  xPadding: 5,
  showLegend: true,
  wholeNumbersOnly: true,
  label: 'memory usage',
  width: '50%-1',
  height: '50%-1'
});

server.on('memory', (message, data) => {
  line.setData(data);

  screen.render();
});

export default line;
