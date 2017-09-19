import * as React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui';

import * as styles from './SymptomsPanel.scss';

class SymptomsPanel extends React.Component {
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
    );
  }
}

export default SymptomsPanel;
