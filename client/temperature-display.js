import React from 'react';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data'
import tuc from 'temp-units-conv';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import moment from 'moment';
import { DateRange } from 'react-date-range';

import { TemperatureLogs } from '../imports/api/temperature-logs';

export class TemperatureDisplay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDateRangeChange({startDate, endDate}) {
    this.setState({...this.state, startDate, endDate});
  }

  currentTemp() {
    const currentTempLog = this.props.temperatureLogs[this.props.temperatureLogs.length-1];
    return currentTempLog ? tuc.c2f(currentTempLog.temperature) : null;
  }

  render() {
    const { temperatureLogs } = this.props;
    let firstTempLogDate, lastTempLogDate;
    if (temperatureLogs && temperatureLogs.length > 0) firstTempLogDate = moment(temperatureLogs[0].date), lastTempLogDate = moment(temperatureLogs[temperatureLogs.length-1].date);
    const startDate = this.state.startDate ? this.state.startDate : firstTempLogDate;
    const endDate = this.state.endDate ? this.state.endDate : lastTempLogDate;
    const data = temperatureLogs
      .filter((log) => {
        const date = moment(log.date);
        return (date.isAfter(startDate) || date.isSame(startDate)) && (date.isBefore(endDate) || date.isSame(endDate));
      })
      .map((log) =>
       ({
        date: moment(log.date).format('M/D/YY HH:mm'),
        temperature: tuc.c2f(log.temperature)
        }));
    return (
      <div>
        <dl>
            <dt>Current Temperature</dt>
            <dd>{this.currentTemp()} F</dd>
        </dl>
        <DateRange 
          startDate={startDate} 
          endDate={endDate} 
          onChange={this.onDateRangeChange.bind(this)} 
          minDate={firstTempLogDate}
          maxDate={lastTempLogDate}
          calendars={1}
        />
        <LineChart width={1750} height={750} data={data}>
          <Tooltip />
          <XAxis dataKey="date" interval={Math.floor(temperatureLogs.length / 10)} />
          <YAxis domain={[]} unit="F" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" unit="F" dataKey="temperature" stroke="#8884d8" />
        </LineChart>
      </div>);
  }
}

export const TemperatureDisplayContainer = withTracker(() => {
  const temperatureLogs = TemperatureLogs.find({}, {sort: { date: 1}}).fetch();
  return { temperatureLogs }
})(TemperatureDisplay);
