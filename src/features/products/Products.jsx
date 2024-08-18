import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Button from '../../Components/UI/Button';

import ProductsTable from './ProductsTable';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/apiProducts';
import { useGetCategoriesQuery } from '../../services/apiCategories';
import PropTypes from 'prop-types';

const Products = ({ isDeal, onAddProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetProductsQuery();
  const { data: categories, isLoading: isCateogryLoading } =
    useGetCategoriesQuery();
  const [products, setProducts] = useState(data);

  const selectValue = searchParams.get('cat') || 'all';
  // Get all categories
  const options = categories?.map(cat => cat.name);

  // Handle filter category
  const handleSelect = e => {
    searchParams.set('cat', e.target.value);
    setSearchParams(searchParams);
  };

  // Handle Search
  const handleSearch = e => {
    const regExp = new RegExp(e.target.value, 'i');
    const filterProducts = data?.filter(prod => {
      if (selectValue !== 'all' && prod.category.name === selectValue) {
        return regExp.test(prod.name);
      }
      if (selectValue === 'all') {
        return regExp.test(prod.name);
      }
    });
    setProducts(filterProducts);
  };

  // Filter products on the basis of category
  useEffect(() => {
    if (!data) return;
    if (!selectValue || selectValue === 'all') {
      setProducts(data);
    } else if (selectValue) {
      const filterProducts = data?.filter(
        prod => prod.category.name === selectValue,
      );
      setProducts(filterProducts);
    }
  }, [selectValue, data]);

  return (
    <section className="flex flex-col gap-8 py-10">
      {!isDeal && (
        <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-200/30 pb-5">
          <h1 className="text-[2rem] font-[600]">Products</h1>

          <Button
            variant="dark"
            link
            to="add"
            className="flex items-center gap-3"
          >
            <MdOutlineAddCircleOutline className="text-[1.3rem]" />
            <span>Add New</span>
          </Button>
        </div>
      )}
      <div className="flex-between gap-3">
        <div className="flex flex-1 items-center">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search here..."
            className="w-full rounded-3xl border-2 border-primary-200 bg-transparent px-5 py-2 outline-none placeholder:text-primary-200 focus:border-primary-300 md:w-2/3 "
          />
          <IoSearchOutline className="-ml-8 cursor-pointer text-[1.2rem] text-primary-200" />
        </div>
        <select
          disabled={isCateogryLoading}
          className="cursor-pointer rounded-md border-2 border-primary-200 bg-transparent px-5 py-2 font-[600] text-primary-500 outline-none "
          onChange={handleSelect}
          value={selectValue}
        >
          <option default value="all">
            All
          </option>
          {options?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <ProductsTable
        products={products}
        isLoading={isLoading}
        isDeal={isDeal}
        onAddProduct={onAddProduct}
      />
    </section>
  );
};

Products.propTypes = {
  isDeal: PropTypes.bool,
  onAddProduct: PropTypes.func,
};

export default Products;
