import { useEffect, useRef, useState } from 'react';
import { useGetInvoiceMutation } from '../../services/apiOrders';
import { useDispatch, useSelector } from 'react-redux';
import Invoice from '../../Components/Invoices/Invoice';
import Button from '../../Components/UI/Button';
import { useReactToPrint } from 'react-to-print';
import { clearCart } from './cartSlice';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { setAmountPaid, setRemainingBalance, setOrderPrice } from '../../features/invoiceSlice/invoiceSlice';


const PrintButton = ({ isLoading, printBill, onCloseModal, value,handleCashInput }) => {
  const [getInvoice, { isLoading: isGetting, error }] = useGetInvoiceMutation();
  const [amount, setAmount] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isLock = cart.items.some(itm => itm.lock);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: 'Invoice',
    content: () => componentRef.current,
    onBeforeGetContent: () => printBill && getInvoice(cart.orderId),
    onAfterPrint: () => {
      if (printBill) {
        dispatch(setAmountPaid(amount));
        dispatch(setRemainingBalance(amount ? amount - cart.totalPrice : 0));
        dispatch(setOrderPrice(cart.totalPrice));
        // Ensure that the cart is only cleared after printing
        dispatch(clearCart());
        onCloseModal();
      }
    },
  });

  const handleAlert = () => {
    // const value = prompt('Please Enter Amount!');
    handleCashInput(true)
    if (!value) return;
    if (value < cart.totalPrice) {
      toast.error('The Amount is less than total Bill', { autoClose: 6000 });
      return;
    }
    setAmount(+value);
    setEnteredAmount(value);
    handleCashInput(false)
  };

  useEffect(() => {
    if (amount !== null) {
      handlePrint();
    }
  }, [amount]);

  useEffect(() => {
    if (error) toast.error(error?.message, { autoClose: 6000 });
  }, [error]);

  return (
    <>
      <Button
        onClick={printBill && !amount ? handleAlert : handlePrint}
        disabled={!cart?.items.length || isGetting || !isLock || isLoading}
        variant="dark"
        className=''
      >
          {isGetting
          ? 'Loading...'
          : printBill
            ?(
              <span className="text-center -ml-4 p-4">
              Check <br />
              <span className="ml-3">out</span>
              </span>
      ) : (
        'Print Invoice'
      )}
      </Button>
      <div className="hidden">
        <Invoice
          ref={componentRef}
          cart={cart}
          printBill={printBill}
          amountPaid={amount}
          remainingBalance={amount ? amount - cart.totalPrice : 0}
        />
      </div>
    </>
  );
};

PrintButton.propTypes = {
  isLoading: PropTypes.bool,
  printBill: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default PrintButton;
