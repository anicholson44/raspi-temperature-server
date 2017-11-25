import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import '../imports/api/temperature-logs';

Meteor.startup(() => {
  //Meteor.publish('temperatureLog', () => TemperatureLogs.find());
});
