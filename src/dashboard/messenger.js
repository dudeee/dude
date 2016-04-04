import messenger from 'messenger';
import config from '../../config';
import { get } from 'lodash';

export const client = messenger.createSpeaker(get(config, 'dashboard.cport') || 8081);
export const server = messenger.createListener(get(config, 'dashboard.sport') || 8082);
