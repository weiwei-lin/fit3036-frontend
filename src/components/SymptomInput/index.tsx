import * as React from 'react';

import { DataType } from '../../models/API';
import BinaryInput from './BinaryInput';
import NumericInput from './NumericInput';
import * as styles from './index.scss';

interface Props {
  name: string;
  type: DataType;
}

const InputComponentClassMap = new Map([
  [DataType.binary, BinaryInput],
  [DataType.numeric, NumericInput],
]);

export default class SymptomInput extends React.Component<Props> {
  public render() {
    const {name, type} = this.props;
    const InputComponentClass = InputComponentClassMap.get(type) as typeof BinaryInput;

    return (
      <div className={styles.symptomInput}>
        <div className={styles.symptomLabel}>{name}</div>
        <InputComponentClass name={this.props.name} />
      </div>
    );
  }
}
