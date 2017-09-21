import * as React from 'react';
import { FlatButton, RaisedButton } from 'material-ui';
import { Doughnut } from 'react-chartjs-2';

// import * as styles from './ResultPanel.scss';

interface Props {
  onBackClicked?: () => void;
  onNextClicked?: () => void;
  result: {[key: string]: number};
}

class ResultPanel extends React.Component<Props> {
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
    );
  }
}

export default ResultPanel;
