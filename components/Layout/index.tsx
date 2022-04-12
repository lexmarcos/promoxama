import { NextComponentType, NextPageContext } from 'next';
import React, { Children } from 'react';
import Navbar from '../Navbar';
interface Props {
  children: unknown;
}
function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
