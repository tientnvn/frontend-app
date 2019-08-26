import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class HotelReservation extends Component {
  static propTypes = {
    exercises: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      arrivals: "",
      departure: "",
      k: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDepartureChange = this.handleDepartureChange.bind(this);
    this.handleKChange = this.handleKChange.bind(this);
    this.handleCheckReservation = this.handleCheckReservation.bind(this);
  }

  handleChange(event) {
    this.setState({arrivals: event.target.value})
  }

  handleKChange(event) {
    this.setState({k: event.target.value})
  }

  handleDepartureChange(event) {
    this.setState({departure: event.target.value})
  }

  handleCheckReservation(event) {
    let arrivals = this.state.arrivals.split(/[ ,.]+/).map(arrival => parseInt(arrival, 10))
    let departure = this.state.departure.split(/[ ,.]+/).map(depart => parseInt(depart, 10))
    this.props.actions.checkReservation({
        "arrivals": arrivals,
        "departure": departure,
        "k": parseInt(this.state.k, 10)
    })
  }

  render() {
    console.log("Hello" + process.env.BACKEND_HOST)
    return (
      <div className="exercises-hotel-reservation">
        <div>
        Arrivals: <input type="text" value={this.state.arrivals} onChange={this.handleChange}/>
        </div>
        <div>
        Departure: <input type="text" value={this.state.departure} onChange={this.handleDepartureChange}/>
        </div>
        <div>
        K: <input type="text" value={this.state.k} onChange={this.handleKChange}/>
        </div>
        <div>
          <button onClick={this.handleCheckReservation}>Check</button>
        </div>

        <div>
        {
          this.props.exercises.isValid ? "Valid" : "Invalid"
        }
        {
          this.props.exercises.invalidList.map((item, index) => <div>
          At day = {item.arrival}, there are {item.reservation} guests in the hotel. But we have only {this.state.k} room(s). </div>)
        }
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    exercises: state.exercises,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelReservation);
