///////////   Imports ///////////

import { BookApp } from './apps/book/BookApp.jsx';
import { MailApp } from './pages/MailApp.jsx';
import { MailDetails } from './apps/mail/pages/MailDetails.jsx';
import { KeepApp } from './pages/KeepApp.jsx';
import { UserMsg } from './components/UserMsg.jsx';
import { AppsusHome } from './pages/AppsusHome.jsx';
import { AppsusAbout } from './pages/AppsusAbout.jsx';
import { AppsusHeader } from './components/AppsusHeader.jsx';
import { AppsusFooter } from './components/AppsusFooter.jsx';
import { noteMail } from './apps/mail/componets/noteMail.jsx';

/////////// React Router ///////////

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

/////////// App ///////////

export function App() {
  return (
    <Router>
      <section className='app'>
        <UserMsg />

        <AppsusHeader />

        <main>
          <Switch>
            <Route component={BookApp} path='/book' />
            <Route component={noteMail} path='/mail/notemail' />
            <Route component={MailDetails} path='/mail/:mailId' />
            <Route component={MailApp} path='/mail' />
            <Route component={KeepApp} path='/keep' />
            <Route component={AppsusAbout} path='/about' />
            <Route component={AppsusHome} path='/' />
          </Switch>
        </main>

        <AppsusFooter />
      </section>
    </Router>
  );
}
