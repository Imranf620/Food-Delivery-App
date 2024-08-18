import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

import DashboardNav from '../Nav/DashboardNav';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';

import Menu from '../UI/Menu';
import { useScreen } from '../../hooks/useScreen';
import Overlay from '../UI/Overlay';
import { HiX } from 'react-icons/hi';
import IconButton from '../UI/IconButton';
import { useSelector } from 'react-redux';
import { removeItem } from '../../utils/localStorage';

const DashboardLayout = ({ children }) => {
  const { screen } = useScreen();
  const [collapseSidebar, setCollapseSidebar] = useState(screen < 768);
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    document.title = 'POS | Dashboard';
  }, []);
  return (
    <>
      {screen >= 768 && (
        <div
          onClick={() => setCollapseSidebar(prev => !prev)}
          className={`fixed  z-20 -translate-x-1/2 text-[2rem] ${
            collapseSidebar ? ' left-[4.7rem] -translate-x-1/2' : 'left-[18rem]'
          } flex-center h-[2.8rem] w-[2.8rem] cursor-pointer rounded-full border-2 border-primary-200 bg-transparent text-primary-500 transition-all duration-500`}
        >
          {collapseSidebar ? (
            <MdKeyboardDoubleArrowRight />
          ) : (
            <MdKeyboardDoubleArrowLeft />
          )}
        </div>
      )}
      {screen >= 640 && (
        <aside
          className={`${
            collapseSidebar ? 'w-[4.7rem]' : 'sm:w-[18rem]'
          } fixed left-0 top-0 h-[100dvh] overflow-x-hidden border-r-2 bg-white transition-all duration-500`}
        >
          <DashboardNav collapseSidebar={collapseSidebar} />
        </aside>
      )}
      {screen < 640 && (
        <>
          <Overlay
            show={showSidebar}
            onClick={() => setShowSidebar(false)}
            className="z-40"
          />
          <aside
            className={`fixed top-0 z-50 flex h-[100dvh] w-[80dvw] justify-center bg-gray-100 ${
              showSidebar ? 'left-0' : 'left-[-100dvw]'
            } transition-all`}
          >
            <IconButton
              className="absolute left-[1rem] top-[1rem] text-[1.5rem] text-primary-500"
              onClick={() => setShowSidebar(false)}
            >
              <HiX />
            </IconButton>
            <DashboardNav onClick={() => setShowSidebar(false)} />
          </aside>
        </>
      )}
      <main
        className={`${
          collapseSidebar ? 'pl-0 sm:pl-[4.7rem]' : 'pl-[18rem]'
        } h-screen w-full transition-all duration-500`}
      >
        <header className=" flex-end h-[70px] border-b-2 bg-white px-10">
          {screen < 640 && (
            <div>
              <IoMenu
                className="cursor-pointer text-[1.5rem]"
                onClick={() => setShowSidebar(prev => !prev)}
              />
            </div>
          )}
          <div className="relative ml-auto">
            <Menu>
              <Menu.Open>
                <div className="relative h-[3rem] w-[3rem] cursor-pointer overflow-hidden rounded-full">
                  <img
                    src="/demo-img.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Menu.Open>
              <Menu.List>
                <ul className="flex w-max flex-col gap-4 rounded-lg bg-white px-3 py-4 shadow-lg">
                  <li className="flex items-center gap-3 break-words text-[0.8rem]">
                    <img
                      className="h-[2rem] w-[2rem] rounded-full object-cover"
                      src="/demo-img.jpg"
                    />
                    <span>{user.email}</span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      removeItem('token');
                      location.assign('/');
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </Menu.List>
            </Menu>
          </div>
        </header>
        <div className="mx-auto flex max-w-[1200px] flex-col overflow-hidden px-5  pb-20 md:px-10">
          {children || <Outlet />}
        </div>
      </main>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
