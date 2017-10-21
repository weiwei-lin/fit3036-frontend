import { expect } from 'chai';

import { DataType } from '../models/API';
import { reduce, DEFAULT_STATE } from './index';
import {
  moveToStep,
  addSymptom,
  updateMeta,
  updatePrediction,
  updateResult,
  finishedDiagnose
} from '../actions';

describe('reducer', function() {
  it('can move to next step', function() {
    const nextState = reduce(DEFAULT_STATE, moveToStep(0));
    expect(nextState.diagnose.stepIndex).to.equal(0);
  });

  it('can record symptom input', function() {
    const nextState = reduce(DEFAULT_STATE, addSymptom('a_symptom', 1));
    expect(nextState.diagnose.symptoms['a_symptom']).be.equal(1);
  });

  it('can record meta input', function() {
    const meta = {'a_meta': DataType.binary};
    const nextState = reduce(DEFAULT_STATE, updateMeta(meta));
    expect(nextState.diagnose.symptomMeta).be.equal(meta);
  });

  it('can record prediction', function() {
    const prediction = {'yes': 1, 'no': 0};
    const nextState = reduce(DEFAULT_STATE, updatePrediction(prediction));
    expect(nextState.diagnose.prediction).be.equal(prediction);
  });

  it('can update result', function() {
    const nextState = reduce(DEFAULT_STATE, updateResult('result'));
    expect(nextState.diagnose.result).be.equal('result');
  });

  it('can clear state when diagnosis finishes', function() {
    const nextState = reduce(DEFAULT_STATE, finishedDiagnose());
    expect(nextState.diagnose.prediction)
      .to.be.equal(DEFAULT_STATE.diagnose.prediction);
    expect(nextState.diagnose.result)
      .to.be.equal(DEFAULT_STATE.diagnose.result);
    expect(nextState.diagnose.stepIndex)
      .to.be.equal(DEFAULT_STATE.diagnose.stepIndex);
    expect(nextState.diagnose.symptoms)
      .to.be.equal(DEFAULT_STATE.diagnose.symptoms);
  });
});
