import * as React from 'react';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';

import { store } from '../models/Store';
import SymptomsPanel from './SymptomsPanel';
import ResultPanel from './ResultPanel';
import ConfirmPanel from './ConfirmPanel';
import * as styles from './App.scss';

interface State {
  stepIndex: number;
}

@observer
class App extends React.Component<{}, State> {
  private readonly panels = [
    (
      <SymptomsPanel
        key={'symptom-panel'}
        onNextClicked={() => this.setState({stepIndex: 1})}
      />
    ),
    (
      <ResultPanel
        key={'result-panel'}
        onBackClicked={() => this.setState({stepIndex: 0})}
        onNextClicked={() => this.setState({stepIndex: 2})}
      />
    ),
    (
      <ConfirmPanel
        key={'confirm-panel'}
        onBackClicked={() => this.setState({stepIndex: 1})}
      />
    )
  ];

  public constructor(props: {}) {
    super(props);
    this.state = {stepIndex: 0};
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
          <Stepper activeStep={this.state.stepIndex}>
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
          {this.panels[this.state.stepIndex]}
        </div>
      </div>
    );
  }
}

export default App;
