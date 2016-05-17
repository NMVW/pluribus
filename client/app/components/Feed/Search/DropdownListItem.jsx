import React from 'react';

import {ListItem} from 'material-ui/List';
import Label from 'material-ui/svg-icons/action/label-outline';

export default class DropdownListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name;
    if(this.props.item.name) {
      name = this.props.item.name;
    } else {
      name = this.props.item.firstName + " " + this.props.item.lastName;
    }
    return (
      <ListItem primaryText={ name }
                leftIcon={<Label />}
                onClick={ this.props.onClick } />
    );
  }
}
