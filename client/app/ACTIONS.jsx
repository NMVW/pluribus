import store from './STORE.jsx';
// ACTIONS for APP component

// sync
export const SET_FILTER = 'SET_FILTER';
export const UPDATE_MAP_BOUNDS = 'UPDATE_MAP_BOUNDS';
export const AUTHENTICATE = 'AUTHENTICATE';
// async
export const CREATE_PLURB = 'CREATE_PLURB';
export const GET_PLURBS = 'GET_PLURBS';
export const LOAD_PLURBS = 'LOAD_PLURBS';
export const FETCHING = 'FETCHING';

// CREATORS--------------------
// sync
export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export function authenticate(verified) {
  return { type: AUTHENTICATE, verified}
}
// async
export function updateMapBounds(mapBounds) {
  return { type: UPDATE_MAP_BOUNDS, mapBounds }
}

export function createPlurb(plurb, mapBounds) {
  fetch('/api/plurb', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(plurb),
  }).then((body) => {
    console.log('make Plurbs');
    store.dispatch(getPlurbs({topicId:plurb.topicId, mapBounds}));
  }).catch((error) => {
    console.error(error);
  });

  return { type: CREATE_PLURB, fetching: true }   
}

// ASYNC ACTIONS
export function getPlurbs(options) {
  // update getPlurbs to handle text filtering on CLIENT-SIDE
  // all plurbs are stored on client on first render, then filter on client-side
  // after initial load, only updates come from server
  // filter param 'PUBLIC', 'PRIVATE', {text}, {location}, etc. for individual plurbs
  fetch('/api/plurbs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(options),
    }).then((plurbs) => plurbs.text())
      .then((plurbs) => {
        console.log("plurbs", plurbs.length, options);
      store.dispatch(loadPlurbs(plurbs));
    }).catch((error) => {
      console.error(error);
    });
    
  return { type: GET_PLURBS, fetching: true }
}

export function loadPlurbs(plurbs) {
  return { type: LOAD_PLURBS, fetching: false, plurbs }
}

export function fetching() {
  return { type: FETCHING, fetching: true };
}
