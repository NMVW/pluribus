import React from 'react';
import Filter from './Filter/Filter.jsx';
import Maker from './Maker/Maker.jsx';
import MessageContainer from './Message/MessageContainer.jsx';
import Search from './Search/Search.jsx';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';


export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  sendPlurb() {
  }
  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Paper style={{float:'right', width:'50%', height:'600px', zIndex:'1'}}>
        <Filter />
        <Search />
        <MessageContainer />
        <Maker />
      </Paper>
    </MuiThemeProvider>
  }
}
