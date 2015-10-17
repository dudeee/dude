import SlackBot from 'slackbots';

let bot = new SlackBot({
  token: process.env.TEST_SLACK_TOKEN,
  name: 'Tester'
});

export default bot;
