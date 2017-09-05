import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './Counter-ducks';

const mapStateToProps = state => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  increment: actions.increment,
  decrement: actions.decrement,
}, dispatch);

export const Counter = ({ counter, increment, decrement }) => (
  <div>
    <button className="increment" onClick={increment}>+</button>
    <button className="decrement" onClick={decrement}>-</button>
    <div>{ counter }</div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
