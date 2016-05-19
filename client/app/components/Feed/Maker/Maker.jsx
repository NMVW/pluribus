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
      charCount: 160,
      error: false,
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
      if(!this.state.error) {
        this._sendPlurb(e)  
      } else {
        e.preventDefault();
      }
    }
  }

  _offsetLocation(numb) {
    let rand = function() {
      return Math.floor(Math.random() * 10);
    }
    let num =  parseFloat(''+Math.round((numb + 0.00001) * 100) / 100 +rand());

    return num;
  }

  _sendPlurb(e) {
    let context = this;
    let lat = this._offsetLocation(this.state.lat);
    let long = this._offsetLocation(this.state.long);

    this.props.dispatch(createPlurb(
      {
        text: this.state.text,
        lat: lat,
        long: long,
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
      {
        text: e.target.value,
        charCount: 160 - e.target.value.length,
        error: (160 - e.target.value.length) < 0,
      }
    );
  }

  render() {
    let auth = this.props.authenticated;
    let topic = this.props.currentTopicId;
    let filter = this.props.filter;
    let hintText = !auth ? "Sign In (upper left-hand corner) to contribute!" :
                   !topic && filter === 'TOPICS' ? "Select a topic (up top) to contribute!" :
                   filter === 'FRIENDS' ? "Switch to global scene to contribute": "Start typing your message!";
    let error = this.state.error;
    let color = !auth || !topic ? {color:"grey"} : {color:"white"};
    let style = {
      color: this.state.charCount < 25 ? "rgba(246, 81, 81, 1)" : "Grey",
    }
    let floatStyle = {
      color: "Grey", 
      fontWeight: "lighter",
    }
    return (
      <MakerBar
        iconElementLeft={
          <ActionButton
            backgroundColor={"rgba(246, 81, 81, 1)"}
            disabled={ !auth || !topic || filter === 'FRIENDS' || error }
            children={<Plus />} 
            onClick={ this._sendPlurb }
          />
        }
        title={
          <TextField
            fullWidth={true}
            multiLine={true}
            rows={1}
            disabled={ !auth || !topic || filter === 'FRIENDS'}
            hintText={ hintText }
            hintStyle={ color }
            onChange={ this._updateMessage }
            onKeyDown={ this._checkPlurb }
            value={ this.state.text }
            inputStyle={{ color : 'white' }}
            floatingLabelText= { <p style={floatStyle}>Remaining Characters: <span style={style}>{this.state.charCount}</span></p> }
            floatingLabelFixed={ true }
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
