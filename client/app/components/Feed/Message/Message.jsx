import React from 'react';

// material-ui components
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Pin from 'material-ui/svg-icons/maps/pin-drop';
import Paper from 'material-ui/Paper';
import Plus from 'material-ui/svg-icons/content/add-circle';

// map utils
import { rePosition } from '../../Map/map_utils.jsx';

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
    // adding a new friend
    fetch('/api/user/friend', {
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
  
  render() {
    // defaults
    let text = this.props.plurb.text;
    let topic = <p onClick={() => {console.log('select Topic!')}}>{"Topic ID: " + this.props.plurb.TopicId}</p>
    let name = this.props.plurb.firstName + ' ' + this.props.plurb.lastName;
    let image = <Avatar
                  onMouseEnter={ this._friendPeek }
                  src={this.props.plurb.picture}
                />
                
    // enter friend mode to add user            
    if (this.state.friendMode) {
      text = name;
      topic = "Follow";
      image = <Plus
                onClick={ this._addFriend.bind(this, this.props.plurb.UserGoogid) }
                onMouseLeave={ this._friendPeek }
              />;
    }
    
    return (
      <Paper>
        <ListItem
          leftIcon={ image }
          primaryText={ text }
          secondaryText={ topic }
          rightIcon={<Pin onClick={ this._reLoc } />}
          style={{width: '96%'}}
        />
      </Paper>
    )
  }
}
