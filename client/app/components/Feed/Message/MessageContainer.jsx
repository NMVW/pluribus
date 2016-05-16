import React from 'react';
import ReactDOM from 'react-dom';

import Message from './Message.jsx';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import { loadPlurbs, getPlurbs } from '../../../ACTIONS.jsx';

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    return (
      <div style={{ height: '400px', overflowY:'scroll' }}>
        <List>
          { 
            this.props.plurbs.map((plurb) => {
              // check filter for what type of plurbs to render
              if (this.props.filter === 'FRIENDS') {
                // only plurbs from user friends!
                return <Message key={plurb.id} plurb={ plurb } /> 
              } else if (this.props.filter === 'TOPICS'){
                // all plurbs
                return <Message key={plurb.id} plurb={ plurb } /> 
              } else {
                console.log('Error: Unexpected filter state:', this.props.filter);
              }
            }) 
          }
        </List>
      </div>
    );
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    plurbs: store.pluribusReducer.plurbs,
    mapBounds: store.pluribusReducer.mapBounds,
    topicId: store.pluribusReducer.currentTopicId,
    filter: store.pluribusReducer.filter
  };
};

// connect the desired state to the relevant component
export default connect(mapStateToProps)(MessageContainer);
