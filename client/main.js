import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { TemperatureDisplayContainer } from './temperature-display.js';

Meteor.startup(() => {
  render(<TemperatureDisplayContainer />, document.getElementById('app'));
});
