import { PiArrowLineRightBold } from 'react-icons/pi';
import IconButton from '../../Components/UI/IconButton';
import Overlay from '../../Components/UI/Overlay';
import { useEffect, useState } from 'react';
import Button from '../../Components/UI/Button';
import { FaShoppingCart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { clearInventoryCart, removeItem } from './inventorySlice';
import PrintInvoiceBtn from './PrintInvoiceBtn';
import { useSendToKitchenMutation } from '../../services/apiMainInventory';
import { useSendToMainMutation } from '../../services/apiKitchenInventory';
import { toast } from 'react-toastify';
import { HiX } from 'react-icons/hi';

const InventoryCart = ({ main }) => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.inventory);
  const [
    sendToKitchen,
    {
      isLoading: isSendingToKitchen,
      reset: resetKitchen,
      isSuccess: isSendedToKitchen,
    },
  ] = useSendToKitchenMutation();
  const [
    sendToMain,
    { isLoading: isSendingToMain, reset: resetMain, isSuccess: isSendedToMain },
  ] = useSendToMainMutation();

  let items;
  if (main) {
    items = cart.main;
  } else {
    items = cart.kitchen;
  }

  const handleShowCart = show => {
    setShowCart(show);
  };

  const handleSendItems = () => {
    const ingredients_data = {};
    items.forEach(itm => (ingredients_data[itm.ingredientID] = +itm.quantity));
    if (main) {
      sendToKitchen({ ingredients_data });
    } else {
      sendToMain({ ingredients_data });
    }
  };

  useEffect(() => {
    if (isSendedToKitchen) {
      toast.success('Items successfully sended to Kitchen Inventory!');
      resetKitchen();
      dispatch(clearInventoryCart());
    }
    if (isSendedToMain) {
      toast.success('Items successfully sended to Main Inventory!');
      resetMain();
      dispatch(clearInventoryCart());
    }
  }, [isSendedToKitchen, isSendedToMain, resetKitchen, resetMain, dispatch]);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = 'hidden';
    }
    if (!showCart) {
      document.body.style.overflow = 'visible';
    }
    return () => (document.body.style.overflow = 'visible');
  }, [showCart]);

  return (
    <>
      <div
        className={`fixed  bottom-[100px] right-[50px] z-10  ${
          !showCart ? 'opacity-1' : 'pointer-events-none opacity-0'
        } transition-all duration-[1s]`}
      >
        <Button
          variant="dark"
          className="h-[50px] w-[50px] shadow-lg "
          onClick={() => handleShowCart(true)}
        >
          <FaShoppingCart />
        </Button>
      </div>
      <Overlay
        show={showCart}
        className="z-50"
        onClick={() => handleShowCart(false)}
      />
      <aside
        className={`fixed bottom-0 right-0 top-0 z-[1000] w-[90%] bg-white sm:w-[22rem]   ${
          showCart ? 'right-0' : 'right-[-100dvw] opacity-0'
        } hight-screen custom-scrollbar z-20 overflow-y-auto overflow-x-hidden transition-all duration-[1s] lg:border-l-2`}
      >
        <div className="flex h-full flex-col overflow-x-hidden px-4 py-3">
          <div className="flex-between mb-4">
            <h2 className="text-[1.4rem] font-[700] ">
              {main ? 'Send to Kitchen' : 'Send to Main'}
            </h2>
            <IconButton onClick={() => handleShowCart(false)}>
              <PiArrowLineRightBold className="text-primary-500" />
            </IconButton>
          </div>
          {/* Clear cart button */}
          <div className="flex-end mb-1">
            <button
              className="rounded-lg bg-red-500 px-3 py-[2px] text-white disabled:opacity-50"
              disabled={!items.length}
              onClick={() => dispatch(clearInventoryCart())}
            >
              Clear Cart
            </button>
          </div>
          {!items.length && (
            <p className="flex-center h-full w-full text-primary-500">
              No Items added to cart yet!
            </p>
          )}
          {/* Cart Items */}
          <section className={`h-full overflow-y-auto`}>
            <ul className="flex flex-col gap-3 pb-16 ">
              {items?.map(itm => (
                <li
                  key={itm.id}
                  className="rounded-md bg-primary-200 px-5 py-3"
                >
                  <div className="flex justify-end py-1">
                    <HiX
                      className="flex cursor-pointer justify-end"
                      onClick={() =>
                        dispatch(removeItem({ isMain: main, id: itm.id }))
                      }
                    />
                  </div>

                  <div className="flex-between ">
                    <h3 className="text-[1.1rem] font-[500]">{itm.name}</h3>
                    <div>
                      {itm.quantity} {itm.unit}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {/* Total bill and print or send to kitchen Buttons */}
          <section className="mt-auto grid grid-cols-2  gap-3 border-t-2 p-3">
            <PrintInvoiceBtn isMain={main} />
            <Button
              disabled={isSendingToKitchen || isSendingToMain || !items.length}
              onClick={handleSendItems}
              variant="dark"
              className="w-full"
            >
              {isSendingToKitchen || isSendingToMain ? 'Sending...' : 'Send'}
            </Button>
          </section>
        </div>
      </aside>
    </>
  );
};

InventoryCart.propTypes = {
  main: PropTypes.bool,
};

export default InventoryCart;
