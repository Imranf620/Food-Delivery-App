import PropTypes from 'prop-types';

import { RxDashboard, RxLayers } from 'react-icons/rx';
import { FiCheckSquare } from 'react-icons/fi';
import { LuClipboardList } from 'react-icons/lu';
import { GoHome } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegListAlt } from 'react-icons/fa';
import { MdOutlineInventory2 } from 'react-icons/md';
import { MdOutlineDiscount } from 'react-icons/md';

import NavItem from './NavItem';

const LINKS = [
  {
    link: '/home',
    icon: <GoHome />,
    name: 'home',
  },
  {
    link: '/dashboard',
    icon: <RxDashboard />,
    name: 'dashboard',
  },
  {
    link: '/orders',
    icon: <FiCheckSquare />,
    name: 'orders',
  },
  {
    link: '/inventory/main',
    icon: <MdOutlineInventory2 />,
    name: 'inventories',
    extended: true,
    links: [
      { link: '/inventory/main', name: 'Main Inventory' },
      { link: '/inventory/kitchen', name: 'Kitchen Inventory' },
    ],
  },
  {
    link: '/categories',
    icon: <RxLayers />,
    name: 'categories',
  },
  {
    link: '/products',
    icon: <LuClipboardList />,
    name: 'porducts',
  },
  {
    link: '/ingredients',
    icon: <FaRegListAlt />,
    name: 'ingredients',
  },
  {
    link: '/deals',
    icon: <MdOutlineDiscount />,
    name: 'deals',
  },
  {
    link: '/settings',
    icon: <IoSettingsOutline />,
    name: 'settings',
  },
];

const DashboardNav = ({ collapseSidebar, onClick }) => {
  return (
    <div
      className={`flex flex-col p-10 pt-14 ${
        collapseSidebar ? 'pl-5' : ''
      } w-[18rem] transition-all`}
    >
      <nav>
        <ul className="flex flex-col gap-3">
          {LINKS.map((link, i) => (
            <NavItem
              key={i}
              link={link}
              onClick={onClick}
              collapseSidebar={collapseSidebar}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

DashboardNav.propTypes = {
  collapseSidebar: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DashboardNav;
