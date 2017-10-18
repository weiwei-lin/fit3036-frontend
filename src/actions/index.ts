import { Action } from 'redux';

import {DataType} from '../models/API';

export enum ActionType {
  toggleDrawer,
  moveToStep,
  updateMeta,
  addSymptom,
  updatePrediction,
  updateResult,
  finishedDiagnose
}

/* toggle drawer */
export interface ToggleDrawerAction extends Action {
  type: ActionType.toggleDrawer;
}

export function toggleDrawer(): ToggleDrawerAction {
  return {type: ActionType.toggleDrawer};
}

/* move to step */
export interface MoveToStepAction extends Action {
  type: ActionType.moveToStep;
  stepIndex: number;
}

export function moveToStep(stepIndex: number): MoveToStepAction {
  return {
    type: ActionType.moveToStep,
    stepIndex
  };
}

/* modify symptom */
export interface AddSymptomAction extends Action {
  type: ActionType.addSymptom;
  name: string;
  value: number | undefined;
}

export function addSymptom(name: string, value: number | undefined): AddSymptomAction {
  return {
    type: ActionType.addSymptom,
    name,
    value
  };
}

/* fetch symptom metas */
export interface UpdateMetaAction extends Action {
  type: ActionType.updateMeta;
  meta: {[key: string]: DataType};
}

export function updateMeta(meta: {[key: string]: DataType}): UpdateMetaAction {
  return {
    type: ActionType.updateMeta,
    meta
  };
}

/* store result */
export interface UpdatePredictionAction extends Action {
  type: ActionType.updatePrediction;
  prediction: {[key: string]: number};
}

export function updatePrediction(prediction: {[key: string]: number}): UpdatePredictionAction {
  return {
    type: ActionType.updatePrediction,
    prediction
  };
}

/* change result confirmation */
export interface UpdateResultAction extends Action {
  type: ActionType.updateResult;
  result: string;
}

export function updateResult(result: string): UpdateResultAction {
  return {
    type: ActionType.updateResult,
    result
  };
}

/* change result confirmation */
export interface FinishedDiagnoseAction extends Action {
  type: ActionType.finishedDiagnose;
}

export function finishedDiagnose(): FinishedDiagnoseAction {
  return {
    type: ActionType.finishedDiagnose
  };
}



/* all action interfaces */
export type AnyAction =
  ToggleDrawerAction |
  MoveToStepAction |
  AddSymptomAction |
  UpdateMetaAction |
  UpdatePredictionAction |
  UpdateResultAction |
  FinishedDiagnoseAction;
