
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
    console.log(typeof clientID);
  });
  // store it on store
}
