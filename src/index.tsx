import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import * as mobx from 'mobx';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

mobx.useStrict(true);

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
