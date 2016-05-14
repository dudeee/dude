export default {
  users: [{
    id: 'U123456',
    name: 'test',
    is_bot: false,
    profile: {
      first_name: 'Mr',
      last_name: 'Test',
      email: 'test@test.com',
      phone: '919999999',
      image_48: 'some_image_48.png'
    }
  }, {
    id: 'U234567',
    name: 'someone',
    is_bot: false,
    profile: {
      first_name: 'Mr',
      last_name: 'Test',
      email: 'test@test.com',
      phone: '919999999'
    }
  }, {
    id: 'U345678',
    name: 'the guy',
    is_bot: false,
    profile: {
      first_name: 'The Great',
      last_name: 'Cyrus',
      email: 'cyrus@test.com',
      phone: '918999999'
    }
  }],

  channels: [{
    id: 'C987654',
    name: 'general'
  }, {
    id: 'C123456',
    name: 'some-team'
  }, {
    id: 'C123457',
    name: 'actions'
  }, {
    id: 'C123458',
    name: 'schedules'
  }],

  ims: [],
  groups: [],
  bots: [],

  self: {
    name: 'bot',
    profile: {}
  }
};
