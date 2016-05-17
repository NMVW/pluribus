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
    }).then((res) => console.log(res))
      .catch((error) => {
        console.error(error);
    });

}
