import * as React from 'react';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';

import { store } from '../models/Store';
import SymptomsPanel from './SymptomsPanel';
import ResultPanel from './ResultPanel';
import * as styles from './App.scss';

@observer
class App extends React.Component {
  private static readonly panels = [
    <SymptomsPanel key={'symptom-panel'} />,
    <ResultPanel key={'result-panel'} />
  ];

  render() {
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
          <Stepper activeStep={0}>
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
          {
            App.panels[0]
          }
        </div>
      </div>
    );
  }
}

export default App;
