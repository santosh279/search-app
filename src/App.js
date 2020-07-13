import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Containers/Dashboard/dashboard';
import GlobalStyle from './global-styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Route path="/" component={Dashboard} />
    </>
  );
}
export default App;
