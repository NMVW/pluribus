import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { getTopics, selectTopic, setTopic, getUsers, setUser, SELECT_TOPIC, SELECT_USER } from './SEARCH_ACTIONS.jsx';

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
      toolTip: "Remove Topic",
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
    // When the filter is toggled 
    if (this.state.filter !== newProps.filter) {
      
      // FRIENDS filter transition
      if(newProps.filter === 'FRIENDS') {
        // set currentTopic to null
        if(this.props.currentTopicId) {
          // reset topicId
          this.props.dispatch({ type: SELECT_TOPIC, topicId: null })
        }
        this.setState({
          currentItem: '',
        });
        // clean slate for user select
        this.props.dispatch(setUser(null, this.props.mapBounds, newProps.filter));
      } else {
      // TOPICS filter transition
        if(this.props.currentUserId) {
          // reset googId
          this.props.dispatch({ type: SELECT_USER, googId: null })
        }
        this.setState({
          currentItem: '',
        });
        // clean slate for topic select
        this.props.dispatch(setTopic(null, this.props.mapBounds, null, newProps.filter));
      }
    }

    if (newProps.filter === 'FRIENDS') {
      // this.newProps.dispatch(setTopic(0, this.newProps.mapBounds));
      this.setState({
        filter: newProps.filter,
        data: newProps.allUsers,
        helperText: "Start typing to search Users!",
        filtered: [],
        toolTip: "Remove User",
      });
    }

    if (newProps.filter === 'TOPICS') {
      this.setState({
        filter: newProps.filter,
        data: newProps.allTopics,
        helperText: "Start typing to search Topics!",
        filtered: [],
        toolTip: "Remove Topic",
        currentItem: newProps.topicName,
      });
    }

  }

  _selectTopic(topic) {
    let selected = topic.name || topic;
    let mapBounds = this.props.mapBounds;
    let filter = this.props.filter;
    
    // Function that checks the DB for the topic name
    selectTopic(selected, mapBounds, filter);

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
    this.props.dispatch(setUser(user.googid, mapBounds, this.props.filter));

    // Closes the dropdown
    this._handleRequestClose();

    // Set's the local state
    this.setState({
      currentItem: user.firstName + " " + user.lastName,
    });
  }

  _check(e) {
    // no empty topic creations
    if(e.key === 'Enter' && e.target.value.length > 0) {
      this._selectTopic(e.target.value);
    }
  }
  
  _textSearch(e) {
    let state = this.props.filter;
    let text = e.target.value.toUpperCase();
    let data = this.state.data;

    // Only try to filter if there are topics
    if (data.length) {
      this.setState({
        filtered: data.filter((item) => {
          if (state === "FRIENDS") {
            name = (item.firstName +" "+ item.lastName).toUpperCase();
          } else {
            name = item.name;
          }

          return name.toUpperCase().includes(text); 
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
      this.props.dispatch(setUser(null, this.props.mapBounds, this.state.filter));
    } else {
      this.props.dispatch(setTopic(null, this.props.mapBounds, null, this.state.filter));   
    }

    this.setState({
      currentItem: '',
    });
  }
  
  render() {
    let element;
    let topic = this.state.currentItem;
    let icon = (<IconButton tooltip={this.state.toolTip} tooltipPosition="top-center" onTouchTap={this._removeItem}>
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
    topicName: store.pluribusReducer.topicName,
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Search);
