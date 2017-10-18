import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FlatButton, RaisedButton } from 'material-ui';
import { Doughnut } from 'react-chartjs-2';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { getAccuracy, DataType } from '../models/API';
import { State } from '../reducer';
import { finishedDiagnose, AnyAction } from '../actions';
// import * as styles from './ResultPanel.scss';

interface Props {
  onBack?: () => void;
  onNext?: () => void;
}

interface SelfState {
  originalAccuracy: number | undefined;
  extraAccuracy: {[key: string]: number};
}

interface StateProps {
  result: {[key: string]: number};
  symptoms: {[key: string]: number | undefined};
  symptomMeta: {[key: string]: DataType};
}

interface DispatchProps {
  dispatch: Dispatch<AnyAction>;
}

class ResultPanel extends React.Component<Props & StateProps & DispatchProps, SelfState> {
  public constructor(props: Props & StateProps & DispatchProps) {
    super(props);
    this.state = {originalAccuracy: undefined, extraAccuracy: {}};
  }

  public componentDidMount() {
    const keys = Object
      .keys(this.props.symptoms)
      .filter((key) => this.props.symptoms[key] !== undefined);

    getAccuracy(keys)
      .then((accuracy) => this.setState({originalAccuracy: accuracy}));
    const extraKeys = Object.keys(this.props.symptomMeta).filter((key) => keys.indexOf(key) === -1);

    for (const key of extraKeys) {
      getAccuracy([...keys, key])
        .then((accuracy) => this.setState({
          extraAccuracy: {
            ...this.state.extraAccuracy,
            [key]: accuracy
          }
        }));
    }
  }

  public componentWillReceiveProps(props: Props & StateProps & DispatchProps) {
    const newKeys = Object
      .keys(props.symptoms)
      .filter((key) => props.symptoms[key] !== undefined);

    const keys = Object
      .keys(this.props.symptoms)
      .filter((key) => this.props.symptoms[key] !== undefined);

    if (newKeys.length !== keys.length || newKeys.every((key) => keys.indexOf(key) !== -1)) {
      this.componentDidMount();
    }
  }

  public render() {
    const labels = Object.keys(this.props.result);
    const data: number[] = [];
    for (const label of labels) {
      data.push(this.props.result[label]);
    }
    return (
      <div>
        <Doughnut 
          data={{
            datasets: [{
              data,
              backgroundColor: ['#36A2EB', '#FF6384']
            }],
            labels: labels,
          }}
        />
        {
          this.state.originalAccuracy !== undefined &&
            (
              <div>Estimated Accuracy: {this.state.originalAccuracy.toFixed(2)}</div>
            )
        }
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Extra Input</TableHeaderColumn>
              <TableHeaderColumn>Extra Accuracy</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.originalAccuracy !== undefined && Object.keys(this.state.extraAccuracy)
                .map((key) => ({key, accuracy: this.state.extraAccuracy[key]}))
                .sort((a, b) => b.accuracy - a.accuracy)
                .map(({key, accuracy}) => (
                  <TableRow key={key}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn>
                      {(accuracy - (this.state.originalAccuracy as number)).toFixed(3)}
                    </TableRowColumn>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
        <FlatButton
          label="Back"
          onClick={this.props.onBack}
          disabled={this.props.onBack === undefined}
        />
        <RaisedButton
          label="Next"
          onClick={this.props.onNext}
          disabled={this.props.onNext === undefined}
          primary={true}
        />
        <RaisedButton
          label="Finish"
          onClick={this.onFinish}
        />
      </div>
    );
  }

  private onFinish = () => {
    this.props.dispatch(finishedDiagnose());
  }
}

export default connect<StateProps, DispatchProps, Props>(
  (state: State) => ({
    result: state.diagnose.prediction,
    symptoms: state.diagnose.symptoms,
    symptomMeta: state.diagnose.symptomMeta
  }),
  (dispatch) => ({dispatch})
)(ResultPanel);
