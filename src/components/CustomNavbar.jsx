import { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

const CustomNavbar =()=>{

  const userContextData = useContext(userContext)

  // navigate to dashboard
  let navigate = useNavigate()

  // it is for dropdown (Mobile view)
  const [isOpen, setIsOpen] = useState(false);

  // this is for Conditional Rendering (after login you can see name on navbar)
  const [login, setLogin] = useState(false)
  // using this user to show name on navbar - used at nav
  const [user, setUser] = useState(undefined)

  // when component load it will callback function in the useEffect will be call.
  useEffect(()=>{
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())
  },[login])

  // for logout
  const logout =()=>{
    doLogout(()=>{
      // logged out
      setLogin(false)
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate("/")
    })
  }

    return(
    <div>
      <Navbar
      color="dark"
      dark
      expand="md"
      fixed=""
      className='px-5'
      >
        <NavbarBrand tag={ReactLink} to="/">My Blogs</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

          <NavItem>
              <NavLink tag={ReactLink} to="/"  >New Feed</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/about"  >About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services"  >Services</NavLink>
            </NavItem>
           
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                {/* <DropdownItem tag={ReactLink} to="/services">Servises</DropdownItem> */}

                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>

                <DropdownItem divider />

                <DropdownItem>You Tube</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>LinkedIn</DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {/* logged In - we can see logout & username */}
            {
              // login comes from const [login
              login && (
                <>
                <NavItem>
              <NavLink tag={ReactLink} to="/user/profile-info">
                Profile Info
              </NavLink>
            </NavItem>
                
            <NavItem>
              <NavLink tag={ReactLink} to="/user/dashboard">
                {/* // user comes from const [user */}
                {user.email}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={logout}>
                Logout
              </NavLink>
            </NavItem>
                </>
              )
            }

          {/* Not logged In - we can see Login & signup */}
          {
            // login comes from const [login
            !login && (
              <>
              <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
              </>
            )
          }

          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;