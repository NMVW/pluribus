import React from 'react';
import { connect } from 'react-redux';

// material-ui components
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Pin from 'material-ui/svg-icons/maps/pin-drop';
import Paper from 'material-ui/Paper';
import Plus from 'material-ui/svg-icons/content/add-circle';
import Minus from 'material-ui/svg-icons/content/remove-circle';

// utils
import { rePosition } from '../../Map/map_utils.jsx';
import { selectTopic, setTopic } from '../Search/SEARCH_ACTIONS.jsx';
import { addFriend, removeFriend } from './MESSAGE_ACTIONS.jsx';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  
    // identify default states of message
    this.state = {
      friendMode: false
    }
    this._reLoc = this._reLoc.bind(this);
    this._friendPeek = this._friendPeek.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._selectTopic = this._selectTopic.bind(this);
  }
  
  _reLoc() {
    // "snap" center of map to plurb location
    rePosition(this.props.plurb);
  }
  
  _friendPeek() {
    // toggle state
    if (this.state.friendMode) {
      this.setState({
        friendMode: false
      });
    } else {
      this.setState({
        friendMode: true
      });
    }
  }
  
  _addFriend(friendGoogId) {
    this.props.dispatch(addFriend(friendGoogId))
  }
  
  _removeFriend(friendGoogId) {
    this.props.dispatch(removeFriend(friendGoogId))
  }
  
  _selectTopic(chosen) {
    let mapBounds = this.props.mapBounds;
    
    // Include filter awareness to choose topic/user
    
    // update the search + store
    selectTopic(chosen, mapBounds);
    this.props.dispatch(setTopic(chosen, mapBounds));
  }
  
  render() {
    // defaults
    let friends = this.props.myFriends;
    let friend = this.props.plurb.UserGoogid;
    let text = this.props.plurb.text;
    let listStyle = {width: '96%'};
    let avatarStyle = {border: 'none'};
    if (friends.includes(friend)) {
      listStyle.backgroundColor = "rgba(0,188,212,.2)";
      avatarStyle.border = "2px solid rgb(0,188,212)";
    }
    let topic = <p onClick={ this._selectTopic.bind(this, this.props.plurb.TopicId) }>{this.props.plurb.Topic.name}</p>
    let name = this.props.plurb.firstName + ' ' + this.props.plurb.lastName;
    let image = <Avatar
                  size={50}
                  style={avatarStyle}
                  onMouseEnter={ this._friendPeek }
                  src={this.props.plurb.picture}
                />
    let location = <Pin 
                  color={"rgba(246, 110, 110, 1)"} 
                  hoverColor={"rgba(246, 81, 81, 1)"} 
                  onClick={ this._reLoc } 
                />
             
    // enter friend mode to add user (implement logic to verify if already friend!)           
    if (this.state.friendMode) {
      text = name;
      
      // existing friendship, remove friend
      if (friends.includes(friend)) {
        topic = "Unfollow";
        image = <Minus 
                  color={"grey"}
                  onClick={ this._removeFriend.bind(this, this.props.plurb.UserGoogid) } 
                  onMouseLeave={ this._friendPeek } 
                />;
      } else {
        topic = "Follow";
        image = <Plus
                  color={"rgb(0,188,212)"}
                  onClick={ this._addFriend.bind(this, this.props.plurb.UserGoogid) }
                  onMouseLeave={ this._friendPeek }
                />;
      }
    }
    let el;
    // determine which element to render
    if (!this.state.friendMode){
      
      el = <ListItem
            leftAvatar={ image }
            primaryText={ text }
            secondaryText={ topic }
            rightIconButton={ location }
            style={listStyle}
          />;
    } else {
      el = <ListItem
            leftCheckbox={ image }
            primaryText={ text }
            secondaryText={ topic }
            rightIconButton={ location }
            style={listStyle}
          />;
    }
    
    return (
      <Paper>
        {el}
      </Paper>
    )
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    mapBounds: store.pluribusReducer.mapBounds,
    currentTopicId: store.pluribusReducer.currentTopicId,
    myFriends: store.pluribusReducer.myFriends,
    filter: store.pluribusReducer.filter
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Message);

