import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Tables from '../../features/tables/Tables';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useScreen } from '../../hooks/useScreen';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../../features/cart/cartSlice';
import ActiveOrders from '../../features/orders/ActiveOrders';
import Menu from '../UI/Menu';
import { removeItem } from '../../utils/localStorage';
import { MdDashboard } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';

const RADIO_OPTION = ['dine in', 'take away', 'delivery'];

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [radioOpt, setRadioOpt] = useState(searchParams.get('type'));
  const [selectValue, setSelectValue] = useState(
    searchParams.get('type') || '',
  );

  const items = useSelector(state => state.cart.items);
  const isOrderPlaced = items.some(itm => itm.lock);
  const dispatch = useDispatch();
  const { screen } = useScreen();
  const type = searchParams.get('type');
  const table = searchParams.get('table');

  // Set type in the header
  const setType = typ => {
    searchParams.set('type', typ.toLowerCase());
    searchParams.delete('table');
    setSearchParams(searchParams);
    dispatch(addUserInfo(null));
  };

  // Handle type change
  const handleRadioChange = e => {
    if (items.length > 0 && type) return;
    setType(e.target.value);
  };

  // handle select change that displays only on mobile devices
  const handleSelectChange = e => {
    setType(e.target.value);
    setSelectValue(e.target.value);
  };
  // new comment out 
  // const handleDeals = () => {
  //   searchParams.set('category', 'deals');
  //   setSearchParams(searchParams);
  // };

  useEffect(() => {
    setRadioOpt(type);
  }, [type]);

  return (
    <header className="sticky top-0 z-10 flex  h-[70px] w-full items-center gap-3 border-b-2 bg-white px-4 md:gap-10 md:px-10 lg:h-[80px]">
      <div className="hover-effect hidden items-center gap-3 sm:flex sm:gap-5">
        {RADIO_OPTION.map(opt => (
          <div className="flex items-center gap-1 md:gap-3" key={opt}>
            <input
              style={{ accentColor: 'orangered' }}
              type="radio"
              id={opt}
              value={opt}
              checked={radioOpt === opt}
              onChange={handleRadioChange}
              className=" h-4 w-4"
            />
            <label
              htmlFor={opt}
              className="text-[1rem] font-[700] capitalize md:text-[1.2rem]"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
      <div className="block sm:hidden">
        <select
          onChange={handleSelectChange}
          value={selectValue}
          className=" w-[150px] rounded-md border bg-white px-4 py-2 leading-tight text-gray-700 focus:border-primary-500 focus:outline-none"
        >
          <option disabled defaultValue value="">
            Please select any type
          </option>
          <option value="dine in">Dine in</option>
          <option value="take away">Take Away</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      {/* Table only display when type is dine in */}
      {type === 'dine in' && (
        <div className="ml-auto lg:ml-10">
          {isOrderPlaced ? (
            <Button disabled={true} variant="dark">
              {table
                ? `H${table}`
                : `${screen < 500 ? 'Table' : 'Choose Table'}`}
            </Button>
          ) : (
            <Modal>
              <Modal.Open id="chooseTable">
                <Button variant="dark">
                  {table
                    ? `H${table}`
                    : `${screen < 500 ? 'Table' : 'Choose Table'}`}
                </Button>
                
              </Modal.Open>
              <Modal.Window
                id="chooseTable"
                closeOnOverlay={true}
                zIndex="z-50"
              >
                <Tables />
              </Modal.Window>
            </Modal>
            
          )}
          
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {/* new comment */}
        {/* <Button variant="dark" onClick={handleDeals}>
          Deals
        </Button> */}
        <Modal>
          <Modal.Open id="activeOrders">
            <Button variant="dark">
              {screen < 500 ? 'Orders' : 'Active Orders'}
            </Button>
          </Modal.Open>
          <Modal.Window id="activeOrders" zIndex="z-50" closeOnOverlay>
            <ActiveOrders />
          </Modal.Window>
        </Modal>
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
              <ul className="flex w-[200px] flex-col rounded-lg bg-white px-3 py-4 pt-7 shadow-lg">
                <li>
                  <NavLink
                    to="/dashboard"
                    className=" flex items-center gap-3 px-3 py-2 hover:bg-gray-800/10"
                  >
                    <MdDashboard />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    className=" flex items-center gap-3 px-3 py-2 hover:bg-gray-800/10"
                    onClick={() => {
                      removeItem('token');
                      location.assign('/');
                    }}
                  >
                    <IoLogOut />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </Menu.List>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
