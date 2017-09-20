import * as React from 'react';
import { FlatButton, RaisedButton } from 'material-ui';

// import * as styles from './ConfirmPanel.scss';

interface Props {
  onBackClicked?: () => void;
  onNextClicked?: () => void;
}

class ConfirmPanel extends React.Component<Props> {
  render() {
    return (
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
    );
  }
}

export default ConfirmPanel;
