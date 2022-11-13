import React from 'react'
import {Navbar,Container,Nav} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../JS/Actions/user'

const NavBar = () => {
const dispatch =useDispatch
const isAuth =useSelector((state) => state.userReducer.isAuth)

  return (
    <div>
    <header>
         <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">AUTH-APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            { isAuth ? (
              <Nav.Link href="/" onClick={() => dispatch(logout)}>
                logout
                </Nav.Link>
            ): (
              <div>
                (
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                )
             </div>
            )}
            
          </Nav>
        </Container>
      </Navbar>
    </header>
    </div>
  )
}

export default NavBar