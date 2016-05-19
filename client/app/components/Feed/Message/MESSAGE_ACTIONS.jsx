// import selectSomething() from search component
import store from '../../../STORE.jsx';

export const ADD_FRIEND = 'ADD_FRIEND';
export const GET_FRIENDS = 'GET_FRIENDS';
export const LOAD_FRIENDS = 'LOAD_FRIENDS';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

export function removeFriend(friendGoogId) {
  // removing friend
  fetch('/api/removefriend/' + friendGoogId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then((res) => {
    // update the store friend list (myFriends)
    store.dispatch(getFriends())
  }).catch((err) => {
    console.error(err);
  });
  
  return { type: REMOVE_FRIEND, fetching: true }
}

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
  fetch('/api/friend', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    }).then((res) => {
      return res.text();
    }).then((friends) => {
      if (friends) {
        let realFriends = JSON.parse(friends);
        
        // find set of friends' googIds
        realFriends = realFriends.map((friend) => {
          return friend.googid;
        });
        
        store.dispatch(loadFriends(realFriends))
      } else {
        // no friends :(
        store.dispatch(loadFriends([]))
      }
    })
      .catch((error) => {
        console.error(error);
    });
  return { type: GET_FRIENDS, fetching: true }
}

export function loadFriends(myFriends) {
  return { type: LOAD_FRIENDS, fetching: false, myFriends }
}
