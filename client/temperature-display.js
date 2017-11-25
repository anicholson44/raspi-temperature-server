import React from 'react';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import tuc from 'temp-units-conv';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';

import { TemperatureLogs } from '../imports/api/temperature-logs';

export class TemperatureDisplay extends React.PureComponent {
  currentTemp() {
    const currentTempLog = this.props.temperatureLogs[0];
    return currentTempLog ? tuc.c2f(currentTempLog.temperature) : null;
  }

  render() {
    const data = this.props.temperatureLogs.map((log) => ({x: log.date, y: tuc.c2f(log.temperature)}));
    return (
      <div>
       {this.currentTemp()}
	<VictoryChart
	  theme={VictoryTheme.material}
	  scale={{x: 'time'}}
	>
	  <VictoryLine
	    style={{
	      data: { stroke: "#c43a31" },
	      parent: { border: "1px solid #ccc"}
	    }}
	    data={data}
	  />
	</VictoryChart>
      </div>);
  }
}

export const TemperatureDisplayContainer = withTracker(() => {
  //const handler = Meteor.subscribe('temperatureLog');
  const temperatureLogs = TemperatureLogs.find({}, {sort: { date: -1}}).fetch();
  return { temperatureLogs }
})(TemperatureDisplay);
