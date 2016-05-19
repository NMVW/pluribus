import store from '../../STORE.jsx';
import { setClient } from '../../ACTIONS.jsx';

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
  }).then((clientData) => {
    let client = JSON.parse(clientData);
    let clientID = client.googid;
    let clientName = client.firstName;
    
    // set client on store
    store.dispatch(setClient(clientID, clientName));
  });
}
