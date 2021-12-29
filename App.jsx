import { BookApp } from './js/apps/book/BookApp.jsx';
import { MailApp } from './js/apps/mail/MailApp.jsx';
import { KeepApp } from './js/apps/keep/KeepApp.jsx';
import { UserMsg } from './js/cmps/UserMsg.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className='app'>
        <UserMsg />

        {/* <Header /> */}

        <main>
          <Switch>
            <Route component={BookApp} path='/book' />
            <Route component={MailApp} path='/mail' />
            <Route component={KeepApp} path='/keep' />
          </Switch>
        </main>

        {/* <Footer /> */}
      </section>
    </Router>
  );
}
