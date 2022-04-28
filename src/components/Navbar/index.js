import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to=''>
          Insurance Plan
        </NavLink>
        <Bars />
      </Nav>
    </>
  );
};

export default Navbar;
