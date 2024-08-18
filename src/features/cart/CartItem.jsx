import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import LazyLoad from 'react-lazy-load';
const CartItem = ({ itm }) => {
  const dispatch = useDispatch();

  // If itm is lock
  if (itm.lock)
    return (
      <li className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 opacity-50">
        {itm.deal ? (
          <div className="flex-center h-[60px] w-[60px] rounded-md bg-primary-400 text-center text-white">
            Deal
          </div>
        ) : (
          <LazyLoad>
            <img
              src={itm.img}
              className="h-[60px] w-[60px] rounded-md object-cover"
            />
          </LazyLoad>
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex-between">
            <h3 className="text-[0.9rem] font-[600] capitalize">{itm.name}</h3>
            {itm.updated && (
              <span className="text-[0.8rem] font-[600]">Updated</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h5 className="text-[0.9rem] font-[700] text-primary-500">
              Rs. {Number(itm.price).toFixed(2, 0)}
            </h5>
            {itm.updated && itm.orgQuantity < itm.quantity ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseItemQuantity(itm))}
                  className="rounded-md border-2 border-primary-500 px-2 hover:bg-primary-500 hover:text-primary-100"
                >
                  &minus;
                </button>
                <span className="font-[700]">{itm.quantity}</span>
                <button
                  onClick={() => dispatch(increaseItemQuantity(itm))}
                  className="rounded-md border-2 border-primary-500 px-2 hover:bg-primary-500 hover:text-primary-100"
                >
                  +
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-[700]">
                <span>Quantity: </span>
                <span className="font-[700]">{itm.quantity}</span>
              </div>
            )}
          </div>
        </div>
      </li>
    );

  // if itm is not lock
  return (
    <li className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2">
      {itm.deal ? (
        <div className="flex-center h-[60px] w-[60px] rounded-md bg-primary-500 text-white">
          Deal
        </div>
      ) : (
        <LazyLoad>
          <img
            src={itm.img}
            className="h-[60px] w-[60px] rounded-md object-cover"
          />
        </LazyLoad>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <h3 className="text-[0.9rem] font-[600] capitalize">{itm.name}</h3>
        <div className="flex items-center justify-between">
          <h5 className="text-[0.9rem] font-[700] text-primary-500">
            Rs. {itm.price.toFixed(2, 0)}
          </h5>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decreaseItemQuantity(itm))}
              className="rounded-md border-2 border-primary-500 px-2 hover:bg-primary-500 hover:text-primary-100"
            >
              &minus;
            </button>
            <span className="font-[700]">{itm.quantity}</span>
            <button
              onClick={() => dispatch(increaseItemQuantity(itm))}
              className="rounded-md border-2 border-primary-500 px-2 hover:bg-primary-500 hover:text-primary-100"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  itm: PropTypes.object.isRequired,
};

export default CartItem;
