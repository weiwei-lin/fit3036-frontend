import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui';

import { State as ReduxState } from '../../reducer';
import { addSymptom, AnyAction } from '../../actions';
import * as styles from './BinaryInput.scss';

interface Props {
  name: string;
}

interface DispatchProps {
  dispath: Dispatch<AnyAction>;
}

interface StateProps {
  value: number | undefined;
}

class BinaryInput extends React.Component<Props & DispatchProps & StateProps> {
  public render() {
    return (
      <RadioButtonGroup
        className={styles.radioButtonGroup}
        name={this.props.name}
        onChange={this.onChange as any}
        valueSelected={this.props.value === undefined ? -1 : this.props.value}
      >
        {
          [1, 0, -1].map((option) => (
            <RadioButton
              key={JSON.stringify(-1)}
              className={styles.radioButton}
              value={option}
              label={option === -1 ? 'Not Sure' : option ? 'Yes' : 'No'}
              style={{width: 'auto'}}
              labelStyle={{width: 'fit-content'}}
            />
          ))
        }
      </RadioButtonGroup>
    );
  }

  private onChange = (event: React.FormEvent<{}>, value: number) => {
    this.props.dispath(addSymptom(this.props.name, value === -1 ? undefined : value));
  }
}

export default connect<StateProps, DispatchProps, Props>(
  (state: ReduxState, ownProps) => ({value: state.diagnose.symptoms[ownProps.name]}),
  (dispath) => ({dispath})
)(BinaryInput);
