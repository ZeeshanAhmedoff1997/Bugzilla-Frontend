import React, { Component } from 'react';
import './App.css';
import RenderRoutes from '../src/client/components/routes';
import Header from '../src/client/components/layout/header'
class App extends Component {
  render() {
    return (
      <div>
        <RenderRoutes />
      </div>
    );
  }
}

export default App;