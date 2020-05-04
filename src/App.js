import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/header/header.component';
import ControlArea from './components/control-area/ControlArea';
import { auth } from './firebase/firebase.util';
import { createUserProfile, userSignOut } from './redux/actions/userActions';
import { connect } from 'react-redux';
import MyProvider from './contexts/songContext';

const FavouritePage = lazy(() => import('./pages/favourites/FavouritesPage'));
const PlaylistPage = lazy(() => import('./pages/playlists/PlaylistPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const SignInSignOut = lazy(() =>
  import('./components/signin-signout/SigninSignout')
);
const GenresPage = lazy(() => import('./pages/genres/GenresPage'));
const HomePage = lazy(() => import('./pages/homepage/HomePage'));

const App = ({ createUserProfile, userSignOut }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        createUserProfile(userAuth, { userAuth });
      } else {
        userSignOut();
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  return (
    <div className='container mussey-app'>
      <MyProvider>
        <HeaderComponent />
        <div className='row'>
          <div className='col'>
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/genres/:id' component={GenresPage} />
                <Route exact path='/playlists/:id' component={PlaylistPage} />
                <Route exact path='/favourites' component={FavouritePage} />
                <Route exact path='/signin' component={SignInSignOut} />
                <Route exact path='/profile' component={ProfilePage} />
              </Suspense>
            </Switch>
          </div>
        </div>
        <ControlArea />
      </MyProvider>
    </div>
  );
};

export default connect(null, { createUserProfile, userSignOut })(App);
