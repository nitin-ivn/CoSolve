import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,RouterProvider,Routes,createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import { About, Contact, CreatePost, Home, Ongoing, Profile,PostPage, LoginPage, EditProfile } from './components/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element = {<LoginPage />} />
    <Route path='home' element = {<Layout />}>
      <Route path='' element  = {<Home />} />
      <Route path='about' element = {<About />} />
      <Route path='contact' element = {<Contact />} />
      <Route path='profile/:userid' element = {<Profile />} />
      <Route path='edit' element = {<EditProfile />} />
      <Route path='ongoing' element  = {<Ongoing />} />
      <Route path='create' element  = {<CreatePost />} />
      <Route path='post/:postid' element = {<PostPage />} />
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div class="bg-container"></div>
    <RouterProvider router={router} />
  </StrictMode>,
)
