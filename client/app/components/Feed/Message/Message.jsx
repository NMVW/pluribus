import React from 'react';
import { connect } from 'react-redux';

// material-ui components
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Pin from 'material-ui/svg-icons/maps/pin-drop';
import Paper from 'material-ui/Paper';
import Plus from 'material-ui/svg-icons/content/add-circle';
import Minus from 'material-ui/svg-icons/content/remove-circle';
import Delete from 'material-ui/svg-icons/content/clear';

// utils
import { rePosition } from '../../Map/map_utils.jsx';
import { setTopic, setUser } from '../Search/SEARCH_ACTIONS.jsx';
import { addFriend, removeFriend, deletePlurb } from './MESSAGE_ACTIONS.jsx';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  
    // identify default states of message
    this.state = {
      friendMode: false,
      owner: false,
      filter: this.props.filter
    }
    this._reLoc = this._reLoc.bind(this);
    this._friendPeek = this._friendPeek.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._selectTopic = this._selectTopic.bind(this);
    this._selectUser = this._selectUser.bind(this);
    this._delete = this._delete.bind(this);
  }
  
  _reLoc() {
    // "snap" center of map to plurb location
    rePosition(this.props.plurb);
  }
  
  _friendPeek() {
    let creator = this.props.plurb.UserGoogid;
    let self = this.props.clientID;
    
    // toggle state
    if (this.state.friendMode) {
      this.setState({
        friendMode: false
      });
    } else if (creator !== self) {
      this.setState({
        friendMode: true
      });
    } else {
      this.setState({
        owner: !this.state.owner
      });
    }
  }
  
  _addFriend(friendGoogId) {
    this.props.dispatch(addFriend(friendGoogId))
  }
  
  _removeFriend(friendGoogId) {
    this.props.dispatch(removeFriend(friendGoogId))
  }
  
  _selectTopic() {
    let mapBounds = this.props.mapBounds;
    let topicId = this.props.plurb.TopicId;
    let topicName = this.props.plurb.Topic.name;
    let filter = this.props.filter;

    // update the search + store
    this.props.dispatch(setTopic(topicId, mapBounds, topicName, filter));
  }
  
  _selectUser() {
    let mapBounds = this.props.mapBounds;
    let filter = this.props.filter;
    let uid = this.props.plurb.UserGoogid;
    
    // update search + store
    this.props.dispatch(setUser(uid, mapBounds, filter));
  }
  
  _delete() {
    console.log('delete plurb');
    deletePlurb(this.props.plurb.id);
  }
  
  render() {
    // defaults
    let friends = this.props.myFriends;
    let friend = this.props.plurb.UserGoogid;
    let text = this.props.plurb.text;
    let listStyle = {width: '96%'};
    let avatarStyle = {border: 'none'};
    
    // highlight friends' messages
    if (friends.includes(friend)) {
      listStyle.backgroundColor = "rgba(0,188,212,.2)";
      // avatar needs darker border due to color balance
      avatarStyle.border = "2px solid rgb(0,142,160)";
    }
    
    // determine subheading to render
    let subheading;
    if (this.props.filter === 'TOPICS') {
      subheading = <p onClick={ this._selectTopic }>{this.props.plurb.Topic.name}</p>
    } else {
      subheading = <p onClick={ this._selectUser }>{this.props.plurb.firstName + ' ' + this.props.plurb.lastName}</p>
    }
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
    let remove = <Delete
                  color={"rgba(246, 81, 81, 1)"}
                  onClick={ this._delete }
                  onMouseLeave={ this._friendPeek }
               />
             
    // enter friend mode to add user (implement logic to verify if already friend!)           
    if (this.state.friendMode) {
      text = name;
      
      // existing friendship, remove friend
      if (friends.includes(friend)) {
        subheading = "Unfollow";
        image = <Minus 
                  color={"grey"}
                  onClick={ this._removeFriend.bind(this, this.props.plurb.UserGoogid) } 
                  onMouseLeave={ this._friendPeek } 
                />;
      } else {
        subheading = "Follow";
        image = <Plus
                  color={"rgb(0,188,212)"}
                  onClick={ this._addFriend.bind(this, this.props.plurb.UserGoogid) }
                  onMouseLeave={ this._friendPeek }
                />;
      }
    }
    let el;
    // determine which element to render
    if (this.state.owner){
      el = <ListItem
            leftCheckbox={ remove }
            primaryText={"Remove"}
            style={{backgroundColor:"rgba(246, 81, 81, .3)"}}
          />;
      
    } else if (this.state.friendMode) {
      el = <ListItem
            leftCheckbox={ image }
            primaryText={ text }
            secondaryText={ subheading }
            secondaryTextLines={1}
            rightIconButton={ location }
            style={listStyle}
          />;
    } else {
      el = <ListItem
            leftAvatar={ image }
            primaryText={ text }
            secondaryText={ subheading }
            secondaryTextLines={1}
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
    clientID: store.pluribusReducer.clientID,
    mapBounds: store.pluribusReducer.mapBounds,
    currentTopicId: store.pluribusReducer.currentTopicId,
    myFriends: store.pluribusReducer.myFriends,
    filter: store.pluribusReducer.filter,
    currentUserId: store.pluribusReducer.currentUserId
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Message);

