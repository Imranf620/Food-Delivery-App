import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { addCartItem } from '../cart/cartSlice';
import RippleEffect from '../../Components/UI/RippleEffect';
import { useGetCategoriesQuery } from '../../services/apiCategories';
import LazyLoad from 'react-lazy-load';

const MenuItem = ({ item, category }) => {
  const isDeal = category === 'deals';
  const dispatch = useDispatch();
  const { data: categories } = useGetCategoriesQuery();
  const img = categories?.find(cat => cat.name === category)?.image;

  return (
    <li
      className="w-full cursor-pointer overflow-hidden rounded-lg bg-white  shadow-sm hover:scale-105 hover:shadow-lg"
      onClick={() =>
        dispatch(addCartItem({ ...item, img, deal: category === 'deals' }))
      }
    >
      <RippleEffect>
        <div className=" border-1 flex h-full flex-col justify-between bg-white p-3 shadow-sm">
          {/* <div className="text-[1.2rem] text-primary-500">
            {ICONS[category]}
          </div> */}

          <h2 className="text-[0.9rem] font-[600]">{item.name}</h2>
          <div className="flex justify-end">
            <LazyLoad>
              <img
                className={`${isDeal ? 'opacity-0' : 'opacity-100'} h-[4rem] w-[4rem] rounded-full border-[3px] border-primary-500/40 object-cover`}
                src={img}
              />
            </LazyLoad>
          </div>
          <div className="">
            <span className="text-[1rem] font-[700] text-primary-500">
              {' '}
              Rs. {item.price}/
            </span>
            <span className="text-[500] text-gray-400">pcs</span>
          </div>
        </div>
      </RippleEffect>
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  category: PropTypes.string,
};

export default MenuItem;
