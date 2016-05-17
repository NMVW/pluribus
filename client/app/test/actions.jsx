// import expect from 'expect';
// import fetch from 'node-fetch';
// import * as Actions from '../ACTIONS.jsx';
// import * as SearchActions from '../components/Feed/Search/SEARCH_ACTIONS.jsx';

// describe('synchronous actions', () => {
//   it('should create an action to set filter on store', () => {
//     const filter = 'FRIENDS';
//     const filterAction = {
//       type: Actions.SET_FILTER,
//       filter
//     };
//     expect(Actions.setFilter(filter)).toEqual(filterAction);
//   })
//   it('should create an action to authenticate user on store', () => {
//     const verified = 'true';
//     const authAction = {
//       type: Actions.AUTHENTICATE,
//       verified
//     }
//     expect(Actions.authenticate(verified)).toEqual(authAction);
//   })
//   it('should create an action to update map values on store', () => {
//     const mapBounds = {
//       maxLat:38.87,
//       maxLng:-76.95,
//       minLat:38.91,
//       minLng:-77.00
//     }
//     const expectedAction = {
//       type: Actions.UPDATE_MAP_BOUNDS,
//       mapBounds
//     }
//   })
//   it('should create an action to set fetching when creating plurb', () => {
//     const newPlurb = {}
//     const bounds = {}
//     let fetching = true;
//     const createAction = {
//       type: Actions.CREATE_PLURB,
//       fetching
//     }
//     expect(Actions.createPlurb(newPlurb, bounds)).toEqual(fetchAction)
//   })
//   it('should create action to set fetching when retrieving plurbs', () => {
//     const options = {}
//     let fetching = true;
//     const getAction = {
//       type: Actions.GET_PLURBS,
//       fetching
//     }
//     expect(Actions.getPlurbs(options)).toEqual(getAction)
//   })
// })

// describe('asynchronous actions', () => {
//   it('should create action to load plurbs', (done) => {
//     let fetching = false;
    
//     fetch('/api/plurbs', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         credentials: 'same-origin',
//         body: JSON.stringify({}),
//       }).then((plurbs) => plurbs.text())
//         .then((plurbs) => {
//           const loadAction = {
//             type: Actions.LOAD_PLURBS,
//             fetching,
//             plurbs
//           }
//           expect(Actions.loadPlurbs(plurbs)).toEqual(loadAction) 
//           done();
//       }).catch((error) => {
//         throw err;
//       });
//   })
//   it('should post plurb to database on create plurb')
//   it('test search ACTIONS')
// })
