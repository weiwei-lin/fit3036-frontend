import * as querystring from 'querystring';

import * as React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { RadioButton, RadioButtonGroup, RaisedButton, FlatButton } from 'material-ui';

import * as styles from './SymptomsPanel.scss';

interface Props {
  onBackClicked?: () => void;
  onComplete: (data: {[key: string]: number}) => void;
}

@observer
class SymptomsPanel extends React.Component<Props> {
  private static readonly API_URL = 'http://127.0.0.1:5000/?';

  private static readonly choiceLabelValueMap = {
    'yes': 1,
    'no': 0,
    'not sure': -1
  };

  private static readonly symptomLabelValueMap = {
    'fever': 'Fever',
    'cough': 'Cough',
    'sore-throat': 'Sore Throat',
    'runny-nose': 'Runny Nose',
    'body-ache': 'Body Ache',
    'headaches': 'Headaches',
    'fatigue': 'Fatigue',
    'chill': 'Chill'
  };

  @observable private readonly symptoms = {
    'fever': -1,
    'cough': -1,
    'sore-throat': -1,
    'runny-nose': -1,
    'body-ache': -1,
    'headaches': -1,
    'fatigue': -1,
    'chill': -1,
  };

  @computed private get isReady(): boolean {
    for (const key of Object.keys(this.symptoms)) {
      if (this.symptoms[key] === -1) {
        return false;
      }
    }
    return true;
  }

  render() {
    return (
      <div className={styles.SymptomsPanel}>
        <div className={styles.selections}>
          {Object.keys(this.symptoms).map((symptom) => (
            <div key={symptom} className={styles.selection}>
              <div className={styles.selectionTitle}>
                {SymptomsPanel.symptomLabelValueMap[symptom]}
              </div>
              <RadioButtonGroup
                className={styles.radioButtonGroup}
                name={symptom}
                defaultSelected={this.symptoms[symptom]}
                onChange={(event, value) => this.setSymptom(symptom, value)}
              >
                {['yes', 'no', 'not sure'].map((option) => (
                  <RadioButton
                    key={option}
                    className={styles.radioButton}
                    value={SymptomsPanel.choiceLabelValueMap[option]}
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
            onClick={this.onNextClicked}
            disabled={!this.isReady}
            primary={true}
          />
        </div>
      </div>
    );
  }

  @action setSymptom = (symptom: string, value: string) => {
    this.symptoms[symptom] = value;
  }

  private onNextClicked = () => {
    const query = querystring.stringify(this.symptoms);
    const url = SymptomsPanel.API_URL + query;

    fetch(url)
      .then((response) => response.json())
      .then((data: {yes: number, no: number}) => this.props.onComplete(data));
  }
}

export default SymptomsPanel;
