import Home from './screens/Home/Home';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Switch, Route} from 'react-router-dom'
import Favoritos from './screens/Favoritos/Favoritos'
import VerTodas from './screens/VerTodas/VerTodas'

function App() {
  return (
    <>
     <Header></Header>
  <Switch>
    <Route path = {'/'} exact = {true} component = {Home}/>
    <Route path={'/Favoritos'} component={Favoritos} />
    <Route path={'/VerTodas'} component={VerTodas} />
       </Switch>
    <Footer></Footer>
    </>
  );
}

export default App;

