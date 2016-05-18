// Create and configure app store
import { createStore, compose } from 'redux'
import pluribusApp from './REDUCERS.jsx'

const initialState = {
  authenticated: false,
  currentTopicId: 0,
  currentUserId: null,
  mapBounds: {
    maxLat:38.87,
    maxLng:-76.95,
    minLat:38.91,
    minLng:-77.00
  },
  plurbs: [],
  filter: 'TOPICS',
  myFriends: [],
  myTopics: [],
  allTopics: [],
  allUsers: [],
  myUsers: [],
  fetching: false,
}

const store = createStore(pluribusApp, { pluribusReducer: initialState }, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? 
  window.devToolsExtension(): (f) => f
  )
);

export default store;
