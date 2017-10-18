import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from 'material-ui';

import { State as ReduxState } from '../../reducer';
import { addSymptom, AnyAction } from '../../actions';
import * as styles from './NumericInput.scss';

interface Props {
  name: string;
}

interface StateProps {
  value: number | undefined;
}

interface DispatchProps {
  dispath: Dispatch<AnyAction>;
}

interface State {
  errorText: string;
}

class NumericInput extends React.Component<Props & DispatchProps & StateProps, State> {
  public constructor(props: Props & DispatchProps & StateProps) {
    super(props);
    this.state = {errorText: ''};
  }

  public render() {
    return (
      <TextField
        className={styles.NumericInput}
        name={this.props.name}
        errorText={this.state.errorText}
        onChange={this.onChange}
      />
    );
  }

  private onChange = (event: React.FormEvent<{}>, newValue: string) => {
    const num = Number(newValue);
    let errorText: string;
    if (newValue === '') {
      errorText = 'Please enter a number';
    } else if (isNaN(num)) {
      errorText = 'Please enter a valid number';
    } else {
      errorText = '';
    }
    this.setState({errorText});
    this.props.dispath(addSymptom(this.props.name, errorText === '' ? num : undefined));
  }
}

export default connect<StateProps, DispatchProps, Props>(
  (state: ReduxState, ownProps) => ({value: state.diagnose.symptoms[ownProps.name]}),
  (dispath) => ({dispath})
)(NumericInput);
