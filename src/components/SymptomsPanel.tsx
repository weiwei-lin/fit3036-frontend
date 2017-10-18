import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RaisedButton, FlatButton } from 'material-ui';

import { AnyAction, updateMeta, updatePrediction } from '../actions';
import { State } from '../reducer';
import { getPrediciton, DataType, getSymtomMata } from '../models/API';
import SymptomInput from './SymptomInput';
// import AddSymptomMeta from './AddSymptomMeta';
import * as styles from './SymptomsPanel.scss';

interface Props {
  onBack?: () => void;
  onNext?: () => void;
}

interface ReduxProps {
  symptomMeta: {[key: string]: DataType};
  symptoms: {[key: string]: number | undefined};
  dispatch: Dispatch<AnyAction>;
}

class SymptomsPanel extends React.Component<Props & ReduxProps> {
  public componentDidMount() {
    getSymtomMata()
      .then((meta) => this.props.dispatch(updateMeta(meta)));
  }

  public render() {
    const {onBack, symptomMeta} = this.props;
    return (
      <div className={styles.SymptomsPanel}>
        <div className={styles.selections}>
          {
            Object.keys(symptomMeta).map((key) => (
              <SymptomInput
                key={key}
                name={key}
                type={symptomMeta[key]}
              />
            ))
          }
        </div>
        <div>
          <FlatButton
            label="Back"
            onClick={onBack}
            disabled={onBack === undefined}
          />
          <RaisedButton
            label="Next"
            onClick={this.onNextClick}
            disabled={Object.keys(this.props.symptoms).every((key) => this.props.symptoms[key] === undefined)}
            primary={true}
          />
        </div>
      </div>
    );
  }

  private onNextClick = () => {

    getPrediciton(this.props.symptoms)
      .then((result) => this.props.dispatch(updatePrediction(result)))
      .then(this.props.onNext as any);
  }
}

export default connect((state: State) => ({
  symptomMeta: state.diagnose.symptomMeta,
  symptoms: state.diagnose.symptoms
}))(SymptomsPanel);
