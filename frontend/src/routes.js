import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContactsList from './pages/contactsList/index';
import UpdateContact from './pages/updateContact/index';
import CreateContact from './pages/createContact/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ContactsList} />
        <Route path="/contact" exact component={UpdateContact} />
        <Route path="/contact/new" component={CreateContact} />
      </Switch>
    </BrowserRouter>
  );
}
