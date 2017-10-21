import { AnyAction, ActionType } from '../actions';
import { DataType } from '../models/API';

export interface State {
  stepIndex: number;
  symptoms: {[key: string]: number | undefined};
  symptomMeta: {[key: string]: DataType};
  prediction: {[key: string]: number};
  result: string | undefined;
}

export const DEFAULT_STATE: State = {
  stepIndex: 0,
  symptoms: {},
  symptomMeta: {},
  prediction: {},
  result: undefined
};

export function reduce(state: State=DEFAULT_STATE, action: AnyAction): State {
  switch (action.type) {
    case ActionType.moveToStep: {
      return {
        ...state,
        stepIndex: action.stepIndex
      };
    }

    case ActionType.updateMeta: {
      return {
        ...state,
        symptomMeta: action.meta
      };
    }

    case ActionType.addSymptom: {
      return {
        ...state,
        symptoms: {
          ...state.symptoms,
          [action.name]: action.value
        }
      };
    }

    case ActionType.updatePrediction: {
      return {
        ...state,
        prediction: action.prediction
      };
    }

    case ActionType.updateResult: {
      return {
        ...state,
        result: action.result
      };
    }

    case ActionType.finishedDiagnose: {
      return {
        ...DEFAULT_STATE,
        symptomMeta: state.symptomMeta
      };
    }

    default:
      return state;
  }
}
