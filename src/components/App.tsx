import * as React from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as classnames from 'classnames';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';

import { store } from '../models/Store';
import SymptomsPanel from './SymptomsPanel';
import ResultPanel from './ResultPanel';
import ConfirmPanel from './ConfirmPanel';
import * as styles from './App.scss';

@observer
class App extends React.Component {
  @observable private _stepIndex = 0;
  @computed private get stepIndex() { return this._stepIndex; }
  private set stepIndex(index) { this._stepIndex = index; }

  @observable private _result: {[key: string]: number} = {};
  @computed private get result() { return this._result; }
  private set result(result) { this._result = result; }

  @computed private get symptomPanel() {
    return (
      <SymptomsPanel
        key={'symptom-panel'}
        onComplete={(result) => {
          this.result = result;
          this.stepIndex = 1;
        }}
      />
    );
  }

  @computed private get resultPanel() {
    return (
      <ResultPanel
        key={'result-panel'}
        result={this.result}
        onBackClicked={() => this.stepIndex = 0}
        onNextClicked={() => this.stepIndex = 2}
      />
    );
  }

  @computed private get confirmPanel() {
    return (
      <ConfirmPanel
        key={'confirm-panel'}
        onBackClicked={() => this.stepIndex = 1}
      />
    );
  }

  @computed private get panels() {
    return [
      this.symptomPanel,
      this.resultPanel,
      this.confirmPanel
    ];
  }

  public render() {
    return (
      <div
        className={classnames(
          styles.app,
          {[styles.drawerIsOpen]: store.drawerIsOpen}
        )}
      >
        <AppBar
          className={styles.appBar}
          title="Data Driven Diagnose"
          onLeftIconButtonTouchTap={store.toogleDrawer}
        />
        <Drawer
          className={styles.drawer}
          open={store.drawerIsOpen}
        >
          <MenuItem
            primaryText="Diagnose"
          />
          <MenuItem
            primaryText="Add More"
          />
          <MenuItem
            primaryText="Login"
          />
        </Drawer>
        <div className={styles.content}>
          <Stepper activeStep={this.stepIndex}>
            <Step>
              <StepLabel>Enter Symptoms</StepLabel>
            </Step>
            <Step>
              <StepLabel>Diagnose Result</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm</StepLabel>
            </Step>
          </Stepper>
          {this.panels[this.stepIndex]}
        </div>
      </div>
    );
  }
}

export default App;
