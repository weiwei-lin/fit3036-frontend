import { combineReducers } from 'redux';
import * as diagnose from './diagnose';
import * as drawer from './drawer';

export interface State {
  diagnose: diagnose.State;
  drawer: drawer.State;
}

export const reduce = combineReducers<State>({
  diagnose: diagnose.reduce,
  drawer: drawer.reduce
});
