import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useGetProductsQuery } from '../../services/apiProducts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../Components/UI/Button';
import Modal from '../../Components/UI/Modal';
import UserInfoForm from './UserInfoForm';
import Spinner from '../../Components/UI/Spinner';
import { useGetDealsQuery } from '../../services/apiDeals';
import { FaSearch } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { data, isLoading } = useGetProductsQuery();
  const { data: deals } = useGetDealsQuery();
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const userInfo = useSelector(state => state.cart.userInfo);
  const type = searchParams.get('type');
  const table = searchParams.get('table');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (userInfo) {
      navigate(`/home?type=${type}`);
    }
  }, [userInfo, type, navigate]);

  useEffect(() => {
    if (!category || !data) return;
    if (category === 'deals') {
      setProducts(deals);
    } else {
      setProducts(data?.filter(prod => prod.category.name === category));
    }
  }, [category, data, deals]);

  useEffect(() => {
    if (searchQuery) {
      setProducts(prevProducts => prevProducts?.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      if (category === 'deals') {
        setProducts(deals);
      } else {
        setProducts(data?.filter(prod => prod.category.name === category));
      }
    }
  }, [searchQuery, category, data, deals]);

  return (
    <section className="mb-10 flex flex-col gap-4 px-4 py-5 sm:px-10">
      {/* Search bar, only displayed if a type is selected */}
      {type && (
      <div className="flex items-center justify-center">
  <input
    type="text"
    onChange={(e) => setSearchQuery(e.target.value)}
    value={searchQuery}
    placeholder="Search here..."
    className="
      peer
      w-full
      rounded-3xl
      border-2
      border-primary-200
      bg-transparent
      px-5
      py-2
      outline-none
      placeholder:text-primary-200
      focus:border-primary-300
      md:w-3/4
      lg:w-2/3
      xl:w-1/2
      2xl:w-1/3
    "
  />
  <IoSearchOutline className="
    -ml-8
    cursor-pointer
    text-[1.2rem]
    text-primary-200
    peer-focus:text-primary-500
  " />
</div>

      )}

      {/* IF no type is selected */}
      {!type && (
        <h1 className="mt-28 text-center text-[1.6rem] font-[600] text-primary-500">
          Please Select either Dine in, Take Away or Delivery.
        </h1>
      )}
      {/* if type and table is selected and no category is selected */}
      {type === 'dine in' && table && !category && (
        <h1 className="mt-28 text-center text-[1.6rem] font-[600] text-primary-500">
          Please Select Category.
        </h1>
      )}

      {/* If type is selected and type is not dine and also user info is added but no category is selected */}
      {type !== 'dine in' && type && !category && (
        <h1 className="mt-28 text-center text-[1.6rem] font-[600] text-primary-500">
          Please Select Category.
        </h1>
      )}
      {/* If type is selcted and no table is selected */}
      {type === 'dine in' && !table && !category &&(
        <h1 className="mt-28 text-center text-[1.6rem] font-[600] text-primary-500">
          Please Select Table.
        </h1>
      )}

      {/* If type is dine in and table is selected and category is selected */}
      {type === 'dine in'  && category && !isLoading && (
        <>
          <h1 className="text-[2rem] font-[700] uppercase tracking-wide">
            {category}
          </h1>
          <ul className="menu-layout gap-4">
            {products?.map((item, i) => (
              <MenuItem item={item} key={i} category={category} />
            ))}
          </ul>
        </>
      )}

      {/* If type is not dine in and type is selected and no user info is selected */}
      {type !== 'dine in' && type && state && !userInfo && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="mt-28 text-center text-[1.6rem] font-[600] text-primary-500">
            Please add your information.
          </h1>
          <Modal>
            <Modal.Open id="user-info">
              <Button className="w-max" variant="dark">
                Add Info
              </Button>
            </Modal.Open>
            <Modal.Window id="user-info" closeOnOverlay zIndex="z-50">
              <UserInfoForm />
            </Modal.Window>
          </Modal>
        </div>
      )}

      {type && category && userInfo && isLoading && (
        <div className="mx-auto my-20">
          <Spinner />
        </div>
      )}

      {type !== 'dine in' && type && category && !isLoading && !state && !userInfo && (
        <>
          <h1 className="text-[2rem] font-[700] uppercase tracking-wide">
            {category}
          </h1>
          <ul className="menu-layout gap-4">
            {products?.map((item, i) => (
              <MenuItem item={item} key={i} category={category} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Menu;