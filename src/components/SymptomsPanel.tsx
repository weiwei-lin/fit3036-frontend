import * as React from 'react';
import { RadioButton, RadioButtonGroup, RaisedButton, FlatButton } from 'material-ui';

import * as styles from './SymptomsPanel.scss';

interface Props {
  onBackClicked?: () => void;
  onNextClicked?: () => void;
}

class SymptomsPanel extends React.Component<Props> {
  private readonly symptoms = [
    'Fever',
    'Cough',
    'Sore Throat',
    'Runny/Stuffy Nose',
    'Body/Muscle Ache',
    'Headaches',
    'Fatigue',
    'Chill'
  ];

  render() {
    return (
      <div className={styles.SymptomsPanel}>
        <div className={styles.selections}>
          {this.symptoms.map((symptom) => (
            <div key={symptom} className={styles.selection}>
              <div className={styles.selectionTitle}>{symptom}</div>
              <RadioButtonGroup
                className={styles.radioButtonGroup}
                name={symptom}
                defaultSelected="not sure"
              >
                {['yes', 'no', 'not sure'].map((option) => (
                  <RadioButton
                    key={option}
                    className={styles.radioButton}
                    value={option}
                    label={option}
                    style={{width: 'auto'}}
                    labelStyle={{width: 'fit-content'}}
                  />
                ))}
              </RadioButtonGroup>
            </div>
          ))}
        </div>
        <div>
          <FlatButton
            label="Back"
            onClick={this.props.onBackClicked}
            disabled={this.props.onBackClicked === undefined}
          />
          <RaisedButton
            label="Next"
            onClick={this.props.onNextClicked}
            disabled={this.props.onNextClicked === undefined}
            primary={true}
          />
        </div>
      </div>
    );
  }
}

export default SymptomsPanel;
