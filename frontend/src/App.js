import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {Provider} from 'react-redux'
import UserWrapper from './Pages/UserWrapper'
import AdminWrapper from './Pages/AdminWrapper'
import {store} from './Redux/Store'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Provider store={store}>
        <Routes>
          <Route path='/*' element={<UserWrapper/>} />
          <Route path='admin/*' element={<AdminWrapper/>} />
        </Routes>
      </Provider>

    </div>
  );
}

export default App;
