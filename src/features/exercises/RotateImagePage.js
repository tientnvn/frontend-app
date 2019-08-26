import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class RotateImagePage extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    let n = this.random(2, 5)
    let matrix = this.randomData(n)
    this.state = {
      n: n,
      matrix: matrix,
      k: 1
    }
    this.props.actions.initData({matrix: []})
    this.handleChange = this.handleChange.bind(this);
    this.handleKChange = this.handleKChange.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
  }

  randomData(n) {
    let matrix = []
    for( let i = 0; i < n; i++) {
      let array = []
      for( let j = 0; j < n; j++) {
        
        array.push(this.random(0, 255))
      }
      matrix.push(array)
    }
    return matrix
  }

  random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }
  handleChange(event) {
    let n = event.target.value;
    if (n <= 1 || n > 10) {
      this.setState({n: n});
    } else {
      let matrix = this.randomData(n)
      this.setState({n: n, matrix: matrix});
    }

  }

  handleKChange(event) {
    this.setState({k: event.target.value});
  }

  handleRotate(event) {
    this.props.actions.initData({matrix: []})
    this.props.actions.rotateImage({data: this.state.matrix, n: this.state.n, k: this.state.k})
  }

  render() {
    return (
      <div className="exercises-rotate-image-page">
        <h1>Rotate Image</h1>
        <div class="container">
          <div class="square">
              <table>
                <tbody>
                {
                  this.state.matrix.map((row, index) => (<tr key={index}>
                  {
                    row.map(column => (<td key={column}>
                    <div class="center">{column}</div>
                    </td>))
                  }
                  </tr>))
                }
                </tbody>
              </table>
          </div>
          <div class="form">
            <div class="control-container">
            n:  <input type="text" value={this.state.n} onChange={this.handleChange}/>
            </div>
            <div class="control-container">
            k:  <input type="text" value={this.state.k} onChange={this.handleKChange}/>
            </div>
            <div class="control-container">
              <button onClick={this.handleRotate}>Rotate</button> 
            </div>
          </div>
          <div class="square">
              <table>
                <tbody>
                {
                  this.props.exercises.matrix.map((row, index) => (<tr key={index}>
                  {
                    row.map(column => (<td key={column}>
                    <div class="center">{column}</div>
                    </td>))
                  }
                  </tr>))
                }
                </tbody>
              </table>
          </div>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RotateImagePage);
