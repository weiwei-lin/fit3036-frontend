import { AnyAction, ActionType } from '../actions';

export interface State {
  isOpen: boolean;
}

export const DEFAULT_STATE: State = {
  isOpen: false,
};

export function reduce(state: State = DEFAULT_STATE, action: AnyAction): State {
  switch (action.type) {
    case ActionType.toggleDrawer: {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }

    default:
      return state;
  }
}
