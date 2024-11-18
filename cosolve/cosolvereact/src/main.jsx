import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,RouterProvider,createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import { About, Contact, CreatePost, Home, Ongoing, Profile,PostPage } from './components/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element  = {<Home />} />
      <Route path='about' element = {<About />} />
      <Route path='contact' element = {<Contact />} />
      <Route path='profile' element = {<Profile />} />
      <Route path='ongoing' element  = {<Ongoing />} />
      <Route path='create' element  = {<CreatePost />} />
      <Route path='post/:postid' element = {<PostPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
