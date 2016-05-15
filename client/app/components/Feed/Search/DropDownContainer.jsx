import React from 'react';

import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import {List} from 'material-ui/List';
import DropdownListItem from './DropdownListItem.jsx';

export default class DropDownContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popover
          open={this.props.open}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.props.handleReqClose}
          animation={PopoverAnimationVertical}
          useLayerForClickAway={false}
        >
            <List>
              {
                this.props.filtered.map((topic) => {
                  return(
                    <DropdownListItem key={topic.id} topic={topic} onClick={ this.props.selectTopic.bind(this, topic) } /> 
                  );
                })
              }
            </List>
        </Popover>

    );
  }
}