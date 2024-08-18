import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const NavItem = ({ link, onClick, collapseSidebar }) => {
  const [isLinkExtended, setIsLinkExtended] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [positions, setPositions] = useState({});
  const ref = useRef();

  const handleOpenMenu = e => {
    const rect = e.target.getBoundingClientRect();
    setPositions({ x: rect.left, y: rect.top });
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
    setPositions(null);
  };

  useEffect(() => {
    document.addEventListener('click', e => {
      if (ref.current && !ref.current.contains(e.target)) handleCloseMenu();
    });

    return () =>
      document.removeEventListener('click', e => {
        if (ref.current && !ref.currents.contains(e.target)) handleCloseMenu();
      });
  }, []);

  if (link.extended && collapseSidebar)
    return (
      <>
        <li
          onMouseEnter={handleOpenMenu}
          className="flex cursor-pointer items-center gap-5 rounded-md px-4 py-2 text-[1.1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white"
          onClick={() => setIsLinkExtended(prev => !prev)}
        >
          <span className="text-[1.3rem]">{link.icon}</span>
          <span>{link.name}</span>
          <span
            className={`ml-auto ${isLinkExtended ? 'rotate-[180deg]' : 'rotate-[0deg]'} transition-transform duration-500`}
          >
            <IoChevronDownOutline />
          </span>
        </li>
        {showMenu &&
          createPortal(
            <ul
              ref={ref}
              className="absolute z-50 flex   flex-col gap-3 rounded-xl border-[1px] bg-white px-5 py-2 text-[1rem] shadow-lg"
              style={{ top: `${positions.y}px`, left: `${positions.x * 3}px` }}
            >
              {link.links.map(itm => (
                <NavLink
                  key={itm.name}
                  onClick={() => onClick?.()}
                  to={itm.link}
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center gap-5 rounded-md bg-primary-500 px-4 py-2 text-[1rem] font-[400] capitalize text-white`
                      : 'flex items-center gap-5 rounded-md px-4 py-2 text-[1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white '
                  }
                >
                  {itm.name}
                </NavLink>
              ))}
            </ul>,
            document.getElementById('overlay'),
          )}
      </>
    );

  if (link.extended)
    return (
      <>
        <li
          className="flex cursor-pointer items-center gap-5 rounded-md px-4 py-2 text-[1.1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white"
          onClick={() => setIsLinkExtended(prev => !prev)}
        >
          <span className="text-[1.3rem]">{link.icon}</span>
          <span>{link.name}</span>
          <span
            className={`ml-auto ${isLinkExtended ? 'rotate-[180deg]' : 'rotate-[0deg]'} transition-transform duration-500`}
          >
            <IoChevronDownOutline />
          </span>
        </li>
        {isLinkExtended &&
          link.links.map((itm, i) => (
            <li key={i} className="animate-dropdown ml-10">
              <NavLink
                onClick={() => onClick?.()}
                to={itm.link}
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center gap-5 rounded-md bg-primary-500 px-4 py-2 text-[1rem] font-[400] capitalize text-white`
                    : 'flex items-center gap-5 rounded-md px-4 py-2 text-[1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white '
                }
              >
                {itm.name}
              </NavLink>
            </li>
          ))}
      </>
    );

  return (
    <li key={link.name}>
      <NavLink
        onClick={() => onClick?.()}
        to={link.link}
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-5 rounded-md bg-primary-500 px-4 py-2 text-[1.1rem] font-[400] capitalize text-white`
            : 'flex items-center gap-5 rounded-md px-4 py-2 text-[1.1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white '
        }
      >
        <span className="text-[1.3rem]">{link.icon}</span>
        <span>{link.name}</span>
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  link: PropTypes.object,
  onClick: PropTypes.func,
  collapseSidebar: PropTypes.bool,
};

export default NavItem;
