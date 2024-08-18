import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cart from '../../features/cart/Cart';
import Header from '../Header/Header';
import Categories from '../../features/categories/Categories';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';

import Button from '../UI/Button';
import Overlay from '../UI/Overlay';
import { useScreen } from '../../hooks/useScreen';
import { useGetCategoriesQuery } from '../../services/apiCategories';

const MainLayout = ({ children }) => {
  const { data: categories } = useGetCategoriesQuery();
  const { screen } = useScreen();
  const [showButton, setShowButton] = useState(screen <= 1024);
  const [showCart, setShowCart] = useState(screen > 1024);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const handleCategories = cat => {
    searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  // Handle Show or Hide cart
  const handleShowCart = () => {
    if (screen < 1024) {
      if (showCart) document.body.style.overflow = 'visible';
      if (!showCart) document.body.style.overflow = 'hidden';
    }
    setShowCart(prev => !prev);

    // show button after a little time for animation
    if (showCart) {
      setTimeout(() => {
        setShowButton(true);
      }, 1000);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    document.title = 'POS | Point of Sale Application';
  }, []);

  return (
    <>
      {/* Show Cart Button */}
      <div
        className={`fixed  bottom-[100px] right-[50px] z-10  ${
          showButton ? 'opacity-1' : 'pointer-events-none opacity-0'
        } transition-all duration-[1s]`}
      >
        <Button
          variant="dark"
          className="h-[50px] w-[50px] shadow-lg "
          onClick={handleShowCart}
        >
          <FaShoppingCart />
        </Button>
      </div>

      <div>
        {/* Header */}
        <Header showCart={showCart} />
        {/* Left Sidebare with categories */}
        
        <aside className="hight-screen fixed inset-0 left-0 top-[80px] hidden w-[18rem] overflow-y-auto border-r-2  bg-white pb-10 md:block lg:w-[22rem] ">
          <Categories />
        </aside>
        <section className="mt-5 overflow-hidden px-4 sm:px-10  md:hidden">
          <h2 className="mb-3 text-[1.4rem] font-[700] uppercase tracking-wide">
            Categories
          </h2>

          <ul className="scrollbar-hidden flex flex-nowrap gap-3 overflow-x-auto">

            {categories?.map((cat, i) => (
              <li key={i}>
                <button
                  onClick={() => handleCategories(cat.name)}
                  className={`w-max rounded-md px-7 py-2  font-[600] uppercase tracking-wider ${
                    cat.name === category
                      ? 'bg-gradient-to-br from-primary-400 to-primary-400 text-white'
                      : 'bg-gray-200 shadow-lg'
                  } from-primary-400 to-primary-400 hover:bg-gradient-to-br hover:text-white`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
        {/* Main  */}
        <main
          className={`mx-auto max-w-[1500px] pl-0 md:pl-[18rem] lg:pl-[22rem] ${
            showCart ? 'lg:pr-[20rem]' : 'pr-0'
          } transition-all duration-[1s]`}
        >
          {children || <Outlet />}
        </main>
        {/* Right sidebar with cart */}
        <aside
          className={`fixed bottom-0 right-0 top-0 w-[90%] bg-white sm:w-[22rem] lg:top-[80px]  ${
            showCart ? 'right-0' : 'right-[-100dvw] opacity-0'
          } hight-screen z-0 overflow-y-auto overflow-x-hidden transition-all duration-[1s] lg:border-l-2`}
        >
          <Cart onSidebarHide={handleShowCart} />
        </aside>
        <Overlay
          show={showCart}
          className="z-10 lg:pointer-events-none lg:hidden"
          onClick={handleShowCart}
        />
      </div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
