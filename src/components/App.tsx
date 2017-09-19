import * as React from 'react';
import { AppBar, List } from 'material-ui';
import * as styles from './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <AppBar title="Data Driven Diagnose"/>
        <List />
        <div className={styles.appHeader}>
          <h2>Welcome to React</h2>
        </div>
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
