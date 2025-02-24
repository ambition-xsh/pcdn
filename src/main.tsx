import ReactDOM from 'react-dom/client'
// import { HashRouter } from 'react-router-dom';
import App from './App.tsx'
// import DefineRoutes from './routes'
import './index.css'
import './globals.css'


import store from './store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <App />
  </Provider>
)
