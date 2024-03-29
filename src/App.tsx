import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import { Storage } from '@capacitor/storage'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useState, useEffect } from 'react';
import { func } from 'prop-types';

function useAuth() {
  const [sessionFetched, setFetchedSession] = useState(false)
  const [isAuth, setAuth] = useState<boolean>(false)
  useEffect(() => {
    Storage.get({key:'auth'}).then((response) => {
      
      setFetchedSession(true)
      if (response.value) {
        const v = JSON.parse(response.value)
        setAuth(v)
      }
    }).catch(e => {
      console.error(e)
    })
  }, [])

  const login = async ()=> {
    setAuth(true)
    await Storage.set({key: "auth", value: JSON.stringify(true)})
  }

  return [sessionFetched, isAuth, login]
}

const AppWrapp: React.FC = () => {
  
  const [sessionFetched, isAuth, login] = useAuth()
  
  console.log('sessionFetched', sessionFetched)
  if (!sessionFetched) {
    console.log('Preloading')
    return <div >preload </div>
  }


  if (!isAuth) {
    return <div><button type="button" onClick={() => {login()} }>Log in</button></div>
  }


  return <div>
    <App />
  </div>
}

const App: React.FC = () => {

  return (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);
}
export default AppWrapp;
