import messenger from 'messenger';
import config from '../../config';

export const client = messenger.createSpeaker(config.dashboard.cport);
export const server = messenger.createListener(config.dashboard.sport);
