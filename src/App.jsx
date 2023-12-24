/* eslint-disable no-unused-vars */
// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
// import './App.css';

import Home from './pages/Home';
import AnotherPage from './AnotherPage';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="centered-content">
            <h1 className="heading">React Router Starter</h1>
            <div className="button-container">
              <Link to="/page1">
                <Button type="primary" className="button">
                  Go to Page 1
                </Button>
              </Link>
              <Link to="/another-page">
                <Button type="primary" className="button">
                  Go to Another Page
                </Button>
              </Link>
            </div>
          </div>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Route path="/" exact component={Home} />
          <Route path="/page1" component={Page1} />
          <Route path="/another-page" component={AnotherPage} />
        </Content>
      </Layout>
    </Router>
  );
};

const Page1 = () => (
  <div>
    <h2>Page 1 Content</h2>
    {/* Add more content as needed */}
  </div>
);

export default App;
