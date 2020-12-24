import React from "react"
import './App.css'
import AllUsersPage from './assets/jsx/Pages/AllUsersPage'
import { BrowserRouter, Route } from "react-router-dom"
import LoginRegisterPage from "./assets/jsx/Pages/LoginRegisterPage"
import Profile from "./assets/jsx/Pages/Profile"
import EditForm from "./assets/jsx/Components/EditForm"
import EditPage from "./assets/jsx/Pages/EditPage"
import AddUserPage from "./assets/jsx/Pages/AddUserPage"

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={AllUsersPage} />
      <Route exact path='/table' component={AllUsersPage} />
      <Route path='/profile' component={Profile} />
      <Route path='/auth' component={LoginRegisterPage} />
      <Route path='/edit' component={EditPage} />
      <Route path='/add' component={AddUserPage} />
    </BrowserRouter>
  )
}

