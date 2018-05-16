﻿import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import UserAddPage from './pages/UserAdd';
import UserEditPage from './pages/UserEdit';
import UserListPage from './pages/UserList';
import BookAddPage from './pages/BookAdd';
import BookEditPage from './pages/BookEdit';
import BookListPage from './pages/BookList';
import HomePage from './pages/Home';

ReactDOM.render((
	<Router history={hashHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/user/add" component={UserAddPage}/>
    <Route path="/user/list" component={UserListPage}/>
    <Route path="/user/edit/:id" component={UserEditPage}/>
    <Route path="/book/add" component={BookAddPage}/>
    <Route path="/book/list" component={BookListPage}/>
    <Route path="/book/edit/:id" component={BookEditPage}/>
  </Router>
), document.getElementById('app'));