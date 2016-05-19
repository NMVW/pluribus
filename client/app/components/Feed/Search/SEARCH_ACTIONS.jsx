import store from '../../../STORE.jsx';

import { getPlurbs } from '../../../ACTIONS.jsx';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const GET_TOPICS = 'GET_TOPICS';
export const LOAD_TOPICS = 'LOAD_TOPICS';
export const SELECT_USER = 'SELECT_USER';
export const GET_USERS = 'GET_USERS';
export const LOAD_USERS = 'LOAD_USERS';

export function selectTopic(currentTopic, mapBounds, filter) {
  fetch('/api/topic', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      name: currentTopic,
    })
  }).then((topicPromise) => topicPromise.text())
    .then((topicJSON) => {
    store.dispatch(getTopics());
    let topicObj = JSON.parse(topicJSON)[0];
    let topicId = topicObj.id;
    let topicName = topicObj.name;
    store.dispatch({ type: SELECT_TOPIC, topicId, topicName });
    store.dispatch(getPlurbs({ topicId, mapBounds, filter }));
  }).catch((error) => {
    console.error("This is an Error in selectTopic ACTION", error);
  });
}

export function setTopic (topicId, mapBounds, topicName, filter) {
  store.dispatch(getPlurbs({ topicId, mapBounds, filter }));
  return { type: SELECT_TOPIC, topicId, topicName };
}

export function getTopics() {
  fetch('/api/topic', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    }).then((topics) => topics.text())
      .then((topics) => {
        store.dispatch(loadTopics(topics));
    }).catch((error) => {
      console.error("This is the error in getTopics",error);
    });

  return { type: GET_TOPICS, fetching: true };
}

export function loadTopics(topics) {
  return { type: LOAD_TOPICS, fetching: false, topics };
}

export function setUser(googId, mapBounds, filter) {
  store.dispatch(getPlurbs({ topicId: null, mapBounds, googId, filter }));
  return { type: SELECT_USER, currentTopicId: null, googId };
}

export function getUsers() {
  fetch('/api/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    }).then((users) => users.text())
      .then((users) => {
        store.dispatch(loadUsers(users));
    }).catch((error) => {
      console.error("This is the error in getUsers",error);
    });

  return { type: GET_USERS, fetching: true };
}

export function loadUsers(users) {
  return { type: LOAD_USERS, fetching: false, users };
}