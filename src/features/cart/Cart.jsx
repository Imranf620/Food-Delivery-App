import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { PiArrowLineRightBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/UI/Button';
import IconButton from '../../Components/UI/IconButton';
import CartItem from './CartItem';
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from '../../services/apiOrders';
import { clearCart, lockItems } from './cartSlice';
import PrintButton from './PrintButton';

const Cart = ({ onSidebarHide }) => {
  const [searchParams] = useSearchParams();
  const userInfo = useSelector(state => state.cart.userInfo);
  const navigate = useNavigate();
  const [cashValue, setCashValue] = useState('');
  const [cashInput, setCashInput] = useState(false);
  const handleCashInput = value => {
    setCashInput(value);
  };

  const [
    addOrder,
    {
      isLoading: isAdding,
      isSuccess: isAdded,
      error,
      data: orderData,
      reset: resetAddOrder,
    },
  ] = useCreateOrderMutation();

  const [
    updateOrder,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      data: updatedData,
      error: updateError,
      reset: resetUpdateOrder,
    },
  ] = useUpdateOrderMutation();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const isLock = cart?.items.some(itm => itm.lock);
  const isOrderAlreadyCreated = cart.items.some(itm => itm.lock === true);
  const isAnyOrderItem = cart.items.some(itm => !itm.lock || itm.updated);

  // Get table and type
  const table = searchParams.get('table');
  const type = searchParams.get('type');
  const category = searchParams.get('category');

  const paidAmount = useSelector(state => state.invoice.amountPaid);
  const remainingBalance = useSelector(state => state.invoice.remainingBalance);
  const orderPrice = useSelector(state => state.invoice.orderPrice);

  // Create or update order
  const handleOrder = () => {
    if (!userInfo) {
      navigate(`/home?type=${type}&table=${table}&category=${category}`, {
        state: { user: false },
      });
    }
    if (userInfo) {
      setCashInput(true);
    }

    const products = {};
    const deals = {};

    // If deals add in deals and if product add in products
    cart.items.forEach(itm => {
      if (itm.deal) {
        deals[itm.dealID] = itm.quantity;
      } else {
        products[itm.productID] = itm.quantity;
      }
    });

    // Prepare data
    let data = {};
    if (type === 'dine in') {
      data = {
        option: type.toLowerCase().replace(' ', '_'),
        table,
        products,
        deals,
      };
    } else {
      data = {
        option: type.toLowerCase().replace(' ', '_'),
        products,
        deals,
        customer_name: cart.userInfo.name,
        address: cart.userInfo.address,
        phone_number: cart.userInfo.phone,
      };
    }

    // If order already created update the order otherwise create new order
    if (isOrderAlreadyCreated) {
      updateOrder({ id: cart.orderId, data });
    } else {
      addOrder(data);
    }
  };

  // new comment

  useEffect(() => {
    if (userInfo) handleOrder();
  }, [userInfo]);

  // Handle success/error state
  useEffect(() => {
    if (isAdded) {
      toast.success('Order successfully created!');
      dispatch(lockItems({ orderId: orderData.id }));
      resetAddOrder();
    }
    if (isUpdated) {
      toast.success('Order successfully updated!');
      dispatch(lockItems({ orderId: updatedData.id }));
      resetUpdateOrder();
    }
    if (error) {
      toast.error(error?.data?.error);
      resetAddOrder();
    }

    if (updateError) {
      toast.error(updateError?.data?.error);
      resetUpdateOrder();
    }
  }, [
    isAdded,
    error,
    isUpdated,
    dispatch,
    resetAddOrder,
    resetUpdateOrder,
    updatedData?.id,
    orderData?.id,
    updateError,
  ]);

  return (
    <div className="flex h-full  flex-col overflow-x-hidden px-4 py-3">
      <div className="flex-between mb-4">
        <h2 className="text-[1.4rem] font-[700] ">Current Order</h2>
        <IconButton onClick={onSidebarHide}>
          <PiArrowLineRightBold className="text-primary-500" />
        </IconButton>
      </div>
      {/* Clear cart button */}
      <div className="flex-end mb-1">
        <button
          disabled={!cart.items.length}
          onClick={() => dispatch(clearCart())}
          className="rounded-lg bg-red-500 px-3 py-[2px] text-white disabled:opacity-50"
        >
          Clear Cart
        </button>
      </div>
      {/* Cart Items */}
      <section
        className={`h-full ${
          !cart.items.length ? 'overflow-y-hidden' : ' custom-scrollbar'
        }`}
      >
        {!cart.items.length && (
          <p className="flex-center h-full text-primary-500">
            No Items added yet!
          </p>
        )}
        <ul className="flex flex-col gap-3 pb-16">
          {cart.items.map((itm, i) => (
            <CartItem key={i} itm={itm} />
          ))}
        </ul>
      </section>
      {/* Total bill and print or send to kitchen Buttons */}
      <section className="mt-auto flex flex-col gap-3 border-t-2 p-3">
        <div className="flex justify-between px-3 font-[700]">
          <span>Total:</span>
          <span>Rs. {Number(cart.totalPrice).toFixed(2, 0)}</span>
        </div>

        <div className="space-y-2">{/* Toggleable Cash Input Field */}</div>

        <div className="flex justify-between ">
          <Button
            disabled={
              isAdding || isUpdating || !cart?.items.length || !isAnyOrderItem
            }
            variant="dark"
            onClick={handleOrder}
            className="w-24"
          >
            {isAdding || isUpdating ? 'Loading...' : 'Send to Kitchen'}
          </Button>
          {/* New added */}
          <PrintButton className="w-24" />
          <PrintButton
            printBill={true}
            value={cashValue}
            handleCashInput={handleCashInput}
            className="w-34"
          />

          {/* new comment */}
          {/* <Modal>
            <Modal.Open id="checkout">
              <Button
                disabled={
                  !cart?.items.length || isUpdated || !isLock || isAdding
                }
                variant="dark"
                onClick={handleOrder}
              >
                Checkout
              </Button>
            </Modal.Open>
            <Modal.Window id="checkout" closeOnOverlay zIndex="z-50">
              <Checkout />
            </Modal.Window>
          </Modal> */}
        </div>
        {/* {paidAmount && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <div className="mb-2 text-lg font-bold">Payment Summary</div>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">Total Bill:</span>
              <span className="text-right">{orderPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">Amount Paid:</span>
              <span className="text-right">{paidAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Change/Remaining Balance:</span>
              <span className="text-right">{remainingBalance}</span>
            </div>
          </div>
        )} */}
      </section>
      {cashInput && (
        <>
           <div className="flex flex-col">
           <label
             htmlFor="cash-amount"
             className="mb-1 text-sm font-medium text-gray-700"
           >
             Cash Amount
           </label>
           <input
             id="cash-amount"
             type="number"
             onChange={e => setCashValue(e.target.value)}
             placeholder="Enter cash amount..."
             className="rounded-lg border border-gray-300 px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
           />
         </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Cash Amount Input */}
       

          {/* Total Price Input */}
          <div className="flex flex-col">
            <label
              htmlFor="total-price"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Total Price
            </label>
            <input
              id="total-price"
              type="text"
              value={`Rs. ${Number(orderPrice ? orderPrice : cart.totalPrice).toFixed(2)}`}
              readOnly
              className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-right text-gray-700 outline-none"
            />
          </div>

          {/* Cash Entered Input */}
          <div className="flex flex-col">
            <label
              htmlFor="cash-entered"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Cash Entered
            </label>
            <input
              id="cash-entered"
              type="text"
              value={`Rs. ${Number(cashValue).toFixed(2)}`}
              readOnly
              className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-right text-gray-700 outline-none"
            />
          </div>

          {/* Change/Remaining Balance Input */}
          <div className="flex flex-col">
            <label
              htmlFor="change-balance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Change
            </label>
            <input
              id="change-balance"
              type="text"
              value={`Rs. ${(Number(cashValue) - Number(orderPrice ? orderPrice : cart.totalPrice)).toFixed(2)}`}
              readOnly
              className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-right text-gray-700 outline-none"
            />
          </div>
        </div>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  onSidebarHide: PropTypes.func,
};

export default Cart;
