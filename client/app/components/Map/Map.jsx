import React from "react";
import { initMap, initHeatMap, getUserLocation, gradient, getPoints, googleArray } from './map_utils.jsx';
import { connect } from 'react-redux';
import { updateMapBounds, getPlurbs } from '../../ACTIONS.jsx';

export let map;
let heatmap;

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    googleArray.clear();
    getPoints(props);
  }

  componentWillMount() {
    getUserLocation();
  }

  // Once DOM node has rendered
  componentDidMount(rootNode) {
    // initialize map
    map = initMap();
    heatmap = initHeatMap();
    heatmap.setMap(map);

    // When user pauses map movement, updates new bounds
    map.addListener('idle', () => {
      let newBounds = map.getBounds();
      
      // pull map bounds off view port
      let Lats = newBounds.H;
      let Lngs = newBounds.j;
            
      let query = {
        mapBounds: {
          maxLat: +Lats.j.toFixed(2),
          maxLng: +Lngs.H.toFixed(2),
          minLat: +Lats.H.toFixed(2),
          minLng: +Lngs.j.toFixed(2)   
        },
        topicId: this.props.currentTopicId,
        googId: this.props.currentUserId,
        filter: this.props.filter
      }
      
      // update bounds on store, then re-fetch plurbs
      this.props.dispatch(updateMapBounds(query.mapBounds))
      this.props.dispatch(getPlurbs(query))
    });
  }

  render() {
    return (
      <div id='map' className='map-gic' style={{ width: '50%', height:'600px', "opacity":'.90' }}></div>
    );
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    mapBounds: store.pluribusReducer.mapBounds,
    plurbs: store.pluribusReducer.plurbs,
    currentTopicId: store.pluribusReducer.currentTopicId,
    currentUserId: store.pluribusReducer.currentUserId,
    filter: store.pluribusReducer.filter
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(GoogleMap);
