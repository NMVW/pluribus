import store from '../../STORE.jsx';
import { setClientID } from '../../ACTIONS.jsx';

export function whoAmI() {
  // determine identity at login
  fetch('/api/whoami', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then((res) => {
    return res.text();
  }).then((clientID) => {
    // set clientID string on store
    store.dispatch(setClientID(clientID));
  });
}
