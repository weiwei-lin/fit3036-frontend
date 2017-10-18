import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RadioButtonGroup, RadioButton, FlatButton, RaisedButton } from 'material-ui';

import { confirmResult } from '../models/API';
import { finishedDiagnose, updateResult, AnyAction } from '../actions';
import { State } from '../reducer';
import * as styles from './ConfirmPanel.scss';

interface Props {
  onBack?: () => void;
}

interface StateProps {
  result: string | undefined;
  prediction: {[key: string]: number};
  symptoms: {[key: string]: number | undefined};
}

interface DispatchProps {
  dispatch: Dispatch<AnyAction>;
}

class ConfirmPanel extends React.Component<Props & StateProps & DispatchProps> {
  render() {
    return (
      <div>
        <div>
          <div className={styles.question}>Is the result correct?</div>
          <RadioButtonGroup
            className={styles.radioButtonGroup}
            name='confirm-result'
            onChange={this.onChange as any}
            valueSelected={this.props.result}
          >
          {
            [undefined, ...Object.keys(this.props.prediction)].map((option) => (
              <RadioButton
                key={JSON.stringify(option === undefined ? 'Not Sure' : option)}
                className={styles.radioButton}
                value={option}
                label={option === undefined ? 'Not Sure' : option}
                style={{width: 'auto'}}
                labelStyle={{width: 'fit-content'}}
              />
            ))
          }
          </RadioButtonGroup>
        </div>
        <div>
          <FlatButton
            label="Back"
            onClick={this.props.onBack}
            disabled={this.props.onBack === undefined}
          />
          <RaisedButton
            label="Confirm"
            onClick={this.onConfirm}
            disabled={this.props.result === undefined}
            primary={true}
          />
          <RaisedButton
            label="Finish"
            onClick={this.onFinish}
          />
        </div>
      </div>
    );
  }

  private onChange = (event: React.FormEvent<{}>, value: string) => {
    this.props.dispatch(updateResult(value));
  }

  private onConfirm = () => {
    confirmResult(this.props.symptoms, this.props.result as string)
      .then(this.onFinish);
  }

  private onFinish = () => {
    this.props.dispatch(finishedDiagnose());
  }
}

export default connect<StateProps, DispatchProps, Props>(
  (state: State) => ({
    prediction: state.diagnose.prediction,
    result: state.diagnose.result,
    symptoms: state.diagnose.symptoms
  }),
  (dispatch) => ({dispatch})
)(ConfirmPanel);
