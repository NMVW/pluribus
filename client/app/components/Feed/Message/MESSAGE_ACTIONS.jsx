// import selectSomething() from search component
export const ADD_FRIEND = 'ADD_FRIEND';

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
      // store.dispatch(getFriends())
    })
      .catch((error) => {
        console.error(error);
    });
  return { type: ADD_FRIEND, fetching:true}
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
    })
      .catch((error) => {
        console.error(error);
    });
}
