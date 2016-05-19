import React from 'react';
import { connect } from 'react-redux';
import { getPlurbs, setFilter } from '../../../ACTIONS.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Tabs, Tab } from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';

import Topics from 'material-ui/svg-icons/social/public';
import Friends from 'material-ui/svg-icons/social/people';

class Filter extends React.Component {
  
  constructor(props) {
    super(props);
    this._handleSwitch = this._handleSwitch.bind(this);
    this.state = {
      filter: "TOPICS"
    };
    
    // build socket listeners into component for plurb updates
    socket.on('plurb created', () => {
      let topicId = this.props.currentTopicId;
      let mapBounds = this.props.mapBounds;
      let filter = this.props.filter;
      getPlurbs({topicId, mapBounds, filter});
    });
    socket.on('plurb destroyed', () => {
      let topicId = this.props.currentTopicId;
      let mapBounds = this.props.mapBounds;
      let filter = this.props.filter;
      getPlurbs({topicId, mapBounds, filter});
    });
  }
  
  _handleSwitch(e) {
    let filt = e.props.value;
    this.setState({
      filter: filt
    });
    this.props.dispatch(setFilter(filt));
  }
  
  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Tabs 
        value={ this.props.filter }
        inkBarStyle={{ backgroundColor:'#F65151' }}
      >
        <Tab value="TOPICS" icon={<Topics />} onActive={ this._handleSwitch } />
        <Tab value="FRIENDS" icon={<Friends />} onActive={ this._handleSwitch } />
      </Tabs>
    </MuiThemeProvider>
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    filter: store.pluribusReducer.filter,
    plurbs: store.pluribusReducer.plurbs,
    mapBounds: store.pluribusReducer.mapBounds,
    currentTopicId: store.pluribusReducer.currentTopicId,
    currentUserId: store.pluribusReducer.currentUserId
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Filter);
