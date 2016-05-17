// import selectSomething() from search component
import store from '../../../STORE.jsx';

export const ADD_FRIEND = 'ADD_FRIEND';
export const GET_FRIENDS = 'GET_FRIENDS';
export const LOAD_FRIENDS = 'LOAD_FRIENDS';

export function addFriend(friendGoogId) {
  // adding a new friend
  fetch('/api/friend', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({friendGoogId}),
    }).then((res) => {
      console.log('res to addFriend', res);
      // update the store friend list (myFriends)
      store.dispatch(getFriends())
    })
      .catch((error) => {
        console.error(error);
    });
  return { type: ADD_FRIEND, fetching:true }
}

export function getFriends() {
  // get user's friends
  fetch('/api/friendsplurbs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    }).then((friendsPlurbs) => {
      console.log('Store googIds in myFriends', friendsPlurbs)
      let friends = JSON.parse(friendsPlurbs).map((plurb) => {
        return plurb.UserGoogid
      })
      store.dispatch(loadFriends(friends))
    })
      .catch((error) => {
        console.error(error);
    });
  return { type: GET_FRIENDS, fetching: true }
}

export function loadFriends(myFriends) {
  return { type: LOAD_FRIENDS, fetching: false, myFriends }
}
