import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// custom components
import GoogleMap from './components/Map/Map.jsx';
import Feed from './components/Feed/Feed.jsx';
import NavBar from './components/Navbar/Navbar.jsx';
import Search from './components/Feed/Search/Search.jsx';
import store from './STORE.jsx'

// material injection
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

class Main extends React.Component {
  render() {
    return (
      <Provider store={ store } >
        <div>
          <NavBar />
          <Feed />
          <GoogleMap />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
