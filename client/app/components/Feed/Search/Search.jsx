import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { getTopics, selectTopic, setTopic } from './SEARCH_ACTIONS.jsx';

// MATERIAL COMPONENTS
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Searchbar from 'material-ui/AppBar';
import EyeGlass from 'material-ui/svg-icons/action/search';
import Backspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import FlatButton from 'material-ui/FlatButton';
import Loyalty from 'material-ui/svg-icons/action/loyalty';

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
    this.setState({
      clickCount: this.state.clickCount+=1,
    });
    if(this.state.clickCount === 2) {
      this.props.dispatch(setTopic(0, this.props.mapBounds));
      this.setState({
        currentTopic: '',
      });
    }
  }
  
  render() {
    let activeElement;
    if(this.props.currentTopicId) {
      let topic;
      let icon;
      if(this.state.clickCount === 1) {
        topic = "REMOVE";
        icon = <Backspace />;
      } else {
        topic = this.state.currentTopic;
        icon = <Loyalty />;
      };
      activeElement = <FlatButton
                        label={topic}
                        labelPosition="before"
                        primary={true}
                        icon={icon}  
                        backgroundColor={'#627072'}
                        hoverColor={'#F65151'}
                        onMouseEnter={ this._setCount }
                        onTouchTap={ this._removeTopic }
                      />
    } else {
      activeElement = <TextField
                        hintText="Start typing to find a Topic!"
                        fullWidth={ true }
                        onChange={ this._textSearch }
                        onKeyDown={ this._check }
                        value= { this.state.currentTopic }
                        inputStyle={{ color : 'white' }}
                      />
    }
    return (
      <Searchbar 
          iconElementLeft={<IconButton><EyeGlass color="white" /></IconButton>}
          title={activeElement}
      >
        <DropDownContainer
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          handleReqClose={this._handleRequestClose}
          filtered={this.state.filtered}
          selectTopic={this._selectTopic}>
        </DropDownContainer>
      </Searchbar>
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
