import React from 'react';
import { connect } from 'react-redux';
import { createPlurb, loadPlurbs } from '../../../ACTIONS.jsx';
import TextField from 'material-ui/TextField';
import ActionButton from 'material-ui/FloatingActionButton';
import Plus from 'material-ui/svg-icons/content/add';
import MakerBar from 'material-ui/AppBar';

export default class Maker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lat: 0,
      long: 0,
    };
    
    // get location on first creation
    this._getLocation();
    this._updateMessage = this._updateMessage.bind(this);
    this._sendPlurb = this._sendPlurb.bind(this);
    this._checkPlurb = this._checkPlurb.bind(this);
    this._getLocation = this._getLocation.bind(this);
  }
  _getLocation() {
    let context = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      context.setState({ lat: position.coords.latitude, long: position.coords.longitude });
    }, function () {
      console.log("Something Failed in grabbing geo coordinates");
    });
  }

  _checkPlurb(e) {
    if(e.key === 'Enter') {
      this._sendPlurb(e)  
    }
  }

  _sendPlurb(e) {
    var context = this;
    this.props.dispatch(createPlurb(
      {
        text: this.state.text,
        lat: this.state.lat,
        long: this.state.long,
        topicId: this.props.currentTopicId,
      }, this.props.mapBounds, this.props.filter
    ));

    // clear the text field
    this.setState(
      { text: '' }
    ); 
  }

  _updateMessage(e) {
    this.setState(
      { text: e.target.value }
    );
  }

  render() {
    let auth = this.props.authenticated;
    let topic = this.props.currentTopicId;
    let filter = this.props.filter;
    let hintText = !auth ? "Sign In (upper left-hand corner) to contribute!" :
                   !topic && filter === 'TOPICS' ? "Select a topic (up top) to contribute!" :
                   filter === 'FRIENDS' ? "Switch to global scene to contribute": "Start typing your message!";
    let color = !auth || !topic ? {color:"grey"} : {color:"white"};
    return (
      <MakerBar
        iconElementLeft={
          <ActionButton
            backgroundColor={"rgba(246, 81, 81, 1)"}
            disabled={ !auth || !topic || filter === 'FRIENDS'}
            children={<Plus />} 
            onClick={ this._sendPlurb }
          />
        }
        title={
          <TextField
            fullWidth={true}
            disabled={ !auth || !topic || filter === 'FRIENDS'}
            hintText={ hintText }
            hintStyle={ color }
            onChange={ this._updateMessage }
            onKeyDown={ this._checkPlurb }
            value={ this.state.text }
            inputStyle={{ color : 'white' }}
          />
        }
      />
    );
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    plurbs: store.pluribusReducer.currentPlurb,
    currentTopicId: store.pluribusReducer.currentTopicId,
    mapBounds: store.pluribusReducer.mapBounds,
    authenticated: store.pluribusReducer.authenticated,
    filter: store.pluribusReducer.filter
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Maker);
