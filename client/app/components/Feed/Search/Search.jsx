import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { getTopics, selectTopic, setTopic, getUsers, setUser } from './SEARCH_ACTIONS.jsx';
import { getPlurbs } from '../../../ACTIONS.jsx';

// MATERIAL COMPONENTS
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Searchbar from 'material-ui/AppBar';
import EyeGlass from 'material-ui/svg-icons/action/search';
import Backspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import FlatButton from 'material-ui/FlatButton';
import Close from 'material-ui/svg-icons/navigation/close';

import DropDownContainer from './DropDownContainer.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "Start typing to search Topics!",
      filter: this.props.filter,
      filtered: [],
      data: [],
      open: false,
      currentItem: '',
    };

    this.props.dispatch(getTopics());
    this.props.dispatch(getUsers());
    this._selectTopic = this._selectTopic.bind(this);
    this._textSearch = this._textSearch.bind(this);
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._check = this._check.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._selectUser = this._selectUser.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if (this.state.filter !== newProps.filter) {
      let topicId = this.props.topicId;
      let googId = this.props.googId;
      let mapBounds = this.props.mapBounds;
      this._removeItem();
      if(newProps.filter === "TOPICS") {
        console.log('CWRP');
        this.props.dispatch(setTopic(0, this.props.mapBounds));
      } else {
        console.log('CWRP');
        this.props.dispatch(setUser(0, this.props.mapBounds));     
      }
    }

    if (newProps.filter === 'FRIENDS') {
      // this.newProps.dispatch(setTopic(0, this.newProps.mapBounds));
      this.setState({
        filter: newProps.filter,
        data: newProps.allUsers,
        helperText: "Start typing to search Users!",
        filtered: [],
      });
    }

    if (newProps.filter === 'TOPICS') {
      this.setState({
        filter: newProps.filter,
        data: newProps.allTopics,
        helperText: "Start typing to search Topics!",
        filtered: [],
      });
    }

  }

  _selectTopic(topic) {
    let selected = topic.name || topic;
    let mapBounds = this.props.mapBounds;

    // Function that checks the DB for the topic name
    selectTopic(selected, mapBounds);

    // Closes the dropdown
    this._handleRequestClose();

    // Set's the local state
    this.setState({
      currentItem: selected,
    });
  }

  _selectUser(user) {
    let mapBounds = this.props.mapBounds;

    // Function that checks the DB for the user name
    this.props.dispatch(setUser(user.googid, mapBounds));

    // Closes the dropdown
    this._handleRequestClose();

    // Set's the local state
    this.setState({
      currentItem: user.firstName + " " + user.lastName,
    });
  }

  _check(e) {
    if(e.key === 'Enter') {
      this._selectTopic(e.target.value);
    }
  }
  
  _textSearch(e) {
    let state = this.props.filter;
    let text = e.target.value;
    let data = this.state.data;

    // Only try to filter if there are topics
    if (data.length) {
      this.setState({
        filtered: data.filter((item) => {
          if (state === "FRIENDS") {
            name = item.firstName +" "+ item.lastName;
          } else {
            name = item.name;
          }

          return name.includes(text); 
        }),
      });
    }
    // Update state as topic changes
    this._handleTouchTap(e);
  }

  _handleTouchTap(e) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
      currentItem: e.target.value,
    });
  }

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  _removeItem(e) {
    if(this.state.filter === "FRIENDS") {
      console.log('removeTopic')
      this.props.dispatch(setUser(0, this.props.mapBounds));
    } else {
      console.log('removeUser')
      this.props.dispatch(setTopic(0, this.props.mapBounds));   
    }

    this.setState({
      currentItem: '',
    });
  }
  
  render() {
    let element;      
    let topic = this.state.currentItem;
    let icon = (<IconButton tooltip="Remove Topic" tooltipPosition="top-center" onTouchTap={this._removeItem}>
                <Close />
              </IconButton>);
    if (this.props.currentTopicId || this.props.currentUserId) {
      element = (
      <Paper style={{'backgroundColor': '#F65151', 'marginTop':'10px', 'display': 'inline-block'}}>
        <span style={{'display': 'inline-block', 'verticalAlign': 'middle', marginBottom: '16px', paddingLeft:'10px'}}>{topic}</span>
        <span>{icon}</span>
      </Paper>); 
    } else {
      element = (
      <TextField
        hintText={this.state.helperText}
        fullWidth={ false }
        onChange={ this._textSearch }
        onKeyDown={ this._check }
        value= { this.state.currentItem }
        inputStyle={{ color : 'white' }}
      />);
    }

    return (
      <div style={{'backgroundColor': '#00BCD4', 'width':'100%', paddingBottom:'10px', height:'65px'}}>
          <div style={{paddingLeft:'10px', 'display': 'inline-block', 'verticalAlign': 'middle'}}><EyeGlass color="white" /></div>
          <div style={{'display': 'inline-block', 'verticalAlign': 'middle', paddingLeft:'10px'}}>{element}</div>
        <DropDownContainer
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          handleReqClose={this._handleRequestClose}
          filtered={this.state.filtered}
          selectTopic={this._selectTopic}
          selectUser={this._selectUser}
          filter={this.props.filter}>
        </DropDownContainer>
      </div>
    );
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    allTopics: store.pluribusReducer.allTopics,
    myTopics: store.pluribusReducer.myTopics,
    mapBounds: store.pluribusReducer.mapBounds,
    currentTopicId: store.pluribusReducer.currentTopicId,
    filter: store.pluribusReducer.filter,
    allUsers: store.pluribusReducer.allUsers,
    currentUserId: store.pluribusReducer.currentUserId,
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Search);
