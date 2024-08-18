import { LiaClipboardCheckSolid } from 'react-icons/lia';
import PrintButton from './PrintButton';
import PropTypes from 'prop-types';

const Checkout = ({ onCloseModal }) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <LiaClipboardCheckSolid />
        <span>Checkout</span>
      </div>
      <p className="py-10 text-center">
        Print Bill <br /> OR <br /> Print Invoice
      </p>
      <div className="flex-center gap-3 py-5">
        <PrintButton onCloseModal={onCloseModal} />
        <PrintButton printBill={true} onCloseModal={onCloseModal} />
      </div>
    </div>
  );
};

Checkout.propTypes = {
  onCloseModal: PropTypes.func,
};

export default Checkout;
