import { useSelector } from 'react-redux';
import Button from '../../Components/UI/Button';
import PropTypes from 'prop-types';
import InventoryInvoice from '../../Components/Invoices/InventoryInvoice';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintInvoiceBtn = ({ isMain }) => {
  const inventory = useSelector(state => state.inventory);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: 'Invoice',
    content: () => componentRef.current,
  });

  let items;
  if (isMain) {
    items = inventory.main;
  } else {
    items = inventory.kitchen;
  }

  return (
    <>
      <Button disabled={!items.length} variant="dark" onClick={handlePrint}>
        Print Invoice
      </Button>
      <div className="hidden">
        <InventoryInvoice ref={componentRef} items={items} isMain={isMain} />
      </div>
    </>
  );
};

PrintInvoiceBtn.propTypes = {
  isMain: PropTypes.bool,
};

export default PrintInvoiceBtn;
