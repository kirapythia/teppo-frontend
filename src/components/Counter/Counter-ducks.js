import { createAction, handleActions } from 'redux-actions';

const INCREMENT = 'kiradigi/counter/INCREMENT';
const DECREMENT = 'kiradigi/counter/DECREMENT';

export const NAME = 'counter';

export const actions = {
  increment: createAction(
    INCREMENT,
    () => ({})
  ),
  decrement: createAction(
    DECREMENT,
    () => ({})
  ),
};

const initialState = {
  counter: 0,
};

export default handleActions({
  [INCREMENT]: state => ({ ...state, counter: state.counter + 1 }),
  [DECREMENT]: state => ({ ...state, counter: state.counter - 1 }),
}, initialState);
