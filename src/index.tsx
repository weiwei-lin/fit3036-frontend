import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import { reduce } from './reducer';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

const store = createStore(reduce);

ReactDOM.render(
  (
    <Provider store={store} >
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
