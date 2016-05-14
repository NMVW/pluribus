import React from 'react';

// material-ui components
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Pin from 'material-ui/svg-icons/maps/pin-drop';
import Paper from 'material-ui/Paper';

// map utils
import { rePosition } from '../../Map/map_utils.jsx';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  
    // identify default states of message
    this.state = {
      addFriend: false
    }
    console.log('default state:',this.state);
    this._reLoc = this._reLoc.bind(this);
    this._friendPeek = this._friendPeek.bind(this);
    // this._addFriend = this._addFriend.bind(this);

  }
  _reLoc() {
    // "snap" center of map to plurb location
    rePosition(this.props.plurb);
  }
  _friendPeek() {
    this.setState({
      addFriend: true
    });
    console.log('addFriend:', this.state);
    console.log('message item should transform to (leftAvatar: plus, primaryText: Name of Friend)');
  }
  render() {
    let image = this.props.plurb.picture;
    let friend = this.props.plurb.UserGoogid;
    let text = this.props.plurb.text;
    let name = this.props.plurb.firstName + ' ' + this.props.plurb.lastName;
    if (this.state.addFriend) {
      text = name;
    }
    return (
      <Paper>
        <ListItem
          leftAvatar={
            <Avatar 
              onMouseEnter={ this._friendPeek } 
              onClick={ () => {console.log('Add friend (friendGoogId)', friend, this.props.plurb)} } 
              src={image} 
            />
          }
          primaryText={ text }
          rightIcon={<Pin onClick={ this._reLoc } />}
          style={{width: '96%'}}
        />
      </Paper>
    )
  }
}
