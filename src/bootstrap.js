import React from 'react';
import ReactDOM from 'react-dom';

async function loadRemoteComponent(scope, module) {
  await __webpack_init_sharing__('default');
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const Module = factory();
  return Module;
}

loadRemoteComponent('remoteApp', './Button').then((RemoteButton) => {
  const container = document.getElementById('root');
  container.innerHTML = '<h1>Host Application</h1>';
  const buttonContainer = document.createElement('div');
  container.appendChild(buttonContainer);

  // Render React component
  ReactDOM.render(React.createElement(RemoteButton.default), buttonContainer);
}).catch(error => {
  console.error('Error loading remote component:', error);
});
