/* eslint-disable */
import React from 'react';

const InventoryInvoice = React.forwardRef(({ items, isMain }, ref) => {
  
  return (
    <div ref={ref}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Restaurant Name</h1>
        <p>Restaurant Address, City, Country</p>
        <p>Phone: (123) 456-7890 | Email: info@Restaurant.com</p>
      </div>

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
              Unit
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((itm, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {itm.name}
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {itm.quantity}
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {itm.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p>Total Items: {items.length} </p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Invioce of Items sended to {isMain ? 'Kitchen' : 'Main'} Inventory
        </p>
      </div>
    </div>
  );
});

export default InventoryInvoice;
