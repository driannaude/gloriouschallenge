import React from 'react';
import { Navbar } from '../navbar';
import './WithNavbar.scss';

interface WithNavbarProps {
  component: React.FC;
}

export const WithNavbar: React.FC<WithNavbarProps> = ({
  component: Component,
}) => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Component />
      </div>
    </>
  );
};
