import * as React from 'react';
import * as classnames from 'classnames';
import { connect, Dispatch } from 'react-redux';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';

import { AnyAction, toggleDrawer, moveToStep } from '../actions';
import { State } from '../reducer';
import SymptomsPanel from './SymptomsPanel';
import ResultPanel from './ResultPanel';
import ConfirmPanel from './ConfirmPanel';
import * as styles from './App.scss';

interface ReduxProps {
  dispatch: Dispatch<AnyAction>;
  stepIndex: number;
  drawerIsOpen: boolean;
}

class App extends React.Component<ReduxProps> {
  private panels = [
    (
      <SymptomsPanel
        onNext={() => this.props.dispatch(moveToStep(1))}
      />
    ),
    (
      <ResultPanel
        onBack={() => this.props.dispatch(moveToStep(0))}
        onNext={() => this.props.dispatch(moveToStep(2))}
      />
    ),
    (
      <ConfirmPanel
        onBack={() => this.props.dispatch(moveToStep(1))}
      />
    )
  ];

  public render() {
    const {drawerIsOpen, stepIndex} = this.props;
    return (
      <div
        className={classnames(
          styles.app,
          {[styles.drawerIsOpen]: drawerIsOpen}
        )}
      >
        <AppBar
          className={styles.appBar}
          title="Data Driven Diagnose (flu)"
          onLeftIconButtonTouchTap={this.onDrawerButtonClick}
        />
        <Drawer
          className={styles.drawer}
          open={drawerIsOpen}
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
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Enter Symptoms</StepLabel>
            </Step>
            <Step>
              <StepLabel>Diagnose Result</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm Result (optional)</StepLabel>
            </Step>
          </Stepper>
          {this.panels[stepIndex]}
        </div>
      </div>
    );
  }

  private onDrawerButtonClick = () => {
    this.props.dispatch(toggleDrawer());
  }
}

export default connect((state: State) => ({
  stepIndex: state.diagnose.stepIndex,
  drawerIsOpen: state.drawer.isOpen
}))(App);
