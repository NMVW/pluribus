import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { getTopics, selectTopic, setTopic } from './SEARCH_ACTIONS.jsx';

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
      filtered: [],
      open: false,
      currentTopic: '',
      clickCount: '',
    };
    this.props.dispatch(getTopics());
    this._selectTopic = this._selectTopic.bind(this);
    this._textSearch = this._textSearch.bind(this);
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._check = this._check.bind(this);
    this._setCount = this._setCount.bind(this);
    this._removeTopic = this._removeTopic.bind(this);
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
      currentTopic: selected,
    });
  }

  _check(e) {
    if(e.key === 'Enter') {
      this._selectTopic(e.target.value);
    }
  }
  
  _textSearch(e) {
    let text = e.target.value;
    let allTopics = this.props.allTopics;

    // Only try to filter if there are topics
    if(allTopics.length) {
      this.setState({
        filtered: allTopics.filter((topic) => {
          return topic.name.includes(text); 
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
      currentTopic: e.target.value,
    });
  }

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  _setCount() {
    this.setState({
      clickCount: 0,
    })
  }

  _removeTopic(e) {
    this.props.dispatch(setTopic(0, this.props.mapBounds));
    this.setState({
      currentTopic: '',
    });
  }
  
  render() {
    let element;      
    let topic = this.state.currentTopic;
    let icon = (<IconButton tooltip="Remove Topic" tooltipPosition="top-center" onTouchTap={this._removeTopic}>
                <Close />
              </IconButton>);
    if (this.props.currentTopicId) {
      element = (
      <Paper style={{'marginTop':'10px', 'display': 'inline-block'}}>
        <span style={{'display': 'inline-block', 'verticalAlign': 'middle', marginBottom: '16px', paddingLeft:'10px'}}>{topic}</span>
        <span>{icon}</span>
      </Paper>); 
    } else {
      element = (
      <TextField
        hintText="Start typing to search Topics!"
        fullWidth={ false }
        onChange={ this._textSearch }
        onKeyDown={ this._check }
        value= { this.state.currentTopic }
        inputStyle={{ color : 'white' }}
      />);
    }

    return (
      <div style={{'backgroundColor': '#00BCD4', 'width':'100%', paddingBottom:'10px'}}>
          <div style={{paddingLeft:'10px', 'display': 'inline-block', 'verticalAlign': 'middle'}}><EyeGlass color="white" /></div>
          <div style={{'display': 'inline-block', 'verticalAlign': 'middle', paddingLeft:'10px'}}>{element}</div>
        <DropDownContainer
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          handleReqClose={this._handleRequestClose}
          filtered={this.state.filtered}
          selectTopic={this._selectTopic}>
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
    currentTopicId: store.pluribusReducer.currentTopicId
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(Search);
