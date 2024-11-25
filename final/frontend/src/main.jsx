import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route, RouterProvider, Routes, createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Layout from './Layout.jsx'
import { About, Contact, CreatePost, Home, Ongoing, Profile, PostPage, Login, EditProfile, Rating } from './components/index.js';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='home' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='profile/:userid' element={<Profile />} />
        <Route path='profileEdit' element={<EditProfile />} />
        <Route path='ongoing' element={<Ongoing />}>
          <Route path='rating/:postid' element={<Rating />} />
        </Route>
        <Route path='create' element={<CreatePost />} />
        <Route path='post/:postid' element={<PostPage />} />
      </Route>
    </>
  )
)
let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
)