import Button from '../../Components/UI/Button';
import PropTypes from 'prop-types';

const DealDetails = ({ deal, onCloseModal }) => {
  return (
    <div>
      <h1 className="bg-primary-500 py-3 text-center text-[1.3rem] font-[600] text-white">
        Deal Details
      </h1>
      <div className="p-4 ">
        <div className="mt-8">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {deal.products.map((itm, i) => (
                <tr key={i}>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {itm.product.name}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {itm.quantity}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {itm.product.price}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {(+itm.product.price * itm.quantity).toFixed(2, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-between mb-4 mt-3">
          <p>
            <strong>
              Total Items:{' '}
              {deal?.products?.reduce((acc, itm) => acc + itm.quantity, 0)}
            </strong>{' '}
          </p>
          <p>
            <strong>Deal Price:</strong> Rs. {deal.price}
          </p>
        </div>
      </div>
      <div className="flex justify-end border-t p-4">
        <Button onClick={onCloseModal} variant="dark">
          Close
        </Button>
      </div>
    </div>
  );
};

DealDetails.propTypes = {
  onCloseModal: PropTypes.func,
  deal: PropTypes.object,
};

export default DealDetails;
