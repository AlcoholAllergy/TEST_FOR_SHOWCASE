import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { applyPolyfills, defineCustomElements } from 'h8k-components/loader';
import StudentProvider from './context/student.context';

ReactDOM.render(
  <StudentProvider>
    <App />
  </StudentProvider>,
  document.getElementById('root')
);
registerServiceWorker();
applyPolyfills().then(() => {
  return defineCustomElements(window);
});
