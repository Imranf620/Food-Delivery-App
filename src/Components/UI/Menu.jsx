import { cloneElement, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';

const MenuContext = createContext({});

const Menu = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [positions, setPositions] = useState({});

  return (
    <MenuContext.Provider
      value={{ showMenu, setShowMenu, positions, setPositions }}
    >
      {children}
    </MenuContext.Provider>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
};

const Open = ({ children }) => {
  const { setShowMenu } = useContext(MenuContext);

  return cloneElement(children, { onClick: () => setShowMenu(true) });
};

const List = ({ children }) => {
  const { showMenu, setShowMenu } = useContext(MenuContext);

  if (!showMenu) return null;

  return (
    <>
      <Overlay
        onClick={() => setShowMenu(false)}
        show={showMenu}
        transparent
        className="z-30"
      />
      <div className={`absolute bottom-0 right-0 top-0 z-30 translate-y-full`}>
        {children}
      </div>
    </>
  );
};

List.propTypes = {
  children: PropTypes.node,
};

Menu.Open = Open;
Menu.List = List;

export default Menu;
