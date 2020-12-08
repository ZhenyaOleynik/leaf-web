import React from "react"
import './App.css'
import AllUsersPage from './assets/jsx/Pages/AllUsersPage'
import { BrowserRouter, Route } from "react-router-dom"
import LoginRegisterPage from "./assets/jsx/Pages/LoginRegisterPage"
import Profile from "./assets/jsx/Pages/Profile"

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={AllUsersPage} />
      <Route exact path='/table' component={AllUsersPage} />
      <Route path='/profile' component={Profile} />
      <Route path='/auth' component={LoginRegisterPage} />
    </BrowserRouter>
  )
}

