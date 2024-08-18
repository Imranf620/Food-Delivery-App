import { MdOutlineDiscount } from 'react-icons/md';

import PropTypes from 'prop-types';
import Input from '../../Components/UI/Input';
import { useForm } from 'react-hook-form';
import Button from '../../Components/UI/Button';
import {
  useCreateDealMutation,
  useUpdateDealMutation,
} from '../../services/apiDeals';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const DealForm = ({
  selectProducts,
  onCloseModal,
  setSelectProducts,
  edit,
  deal,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: edit ? { dealname: deal.name, price: +deal.price } : {},
  });
  const [createDeal, { isLoading, isSuccess, reset }] = useCreateDealMutation();
  const [
    updateDeal,
    { isLoading: isUpdating, reset: resetUpdate, isSuccess: isUpdated },
  ] = useUpdateDealMutation();
  const totalProducts = selectProducts?.reduce(
    (acc, prod) => acc + prod.quantity,
    0,
  );

  const onSubmit = _data => {
    const data = {
      name: _data.dealname,
      price: +_data.price,
      products: {},
    };

    selectProducts.forEach(prd => {
      data.products[prd.productID] = prd.quantity;
    });

    if (edit) {
      console.log(data);
      updateDeal({ id: deal.id, data });
    } else {
      createDeal(data);
    }
  };

  // Handle success state when deal is created
  useEffect(() => {
    if (isSuccess) {
      toast.success('Deal successfully created!', { autoClose: 6000 });
      reset();
      onCloseModal();
      setSelectProducts([]);
    }
  }, [isSuccess, reset, onCloseModal, setSelectProducts]);

  // Handle success state when deal is updated
  useEffect(() => {
    if (isUpdated) {
      toast.success('Deal successfully updated!', { autoClose: 6000 });
      resetUpdate();
      onCloseModal();
    }
  }, [isUpdated, resetUpdate, onCloseModal]);

  return (
    <div>
      <h1 className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <MdOutlineDiscount />
        <span>Add new Deal</span>
      </h1>
      <h3 className="px-3 py-4 text-[1rem] ">
        <span className="font-[600]">Total Products: </span>
        <span>{totalProducts}</span>
      </h3>
      <form className="my-3 px-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label="Deal Name"
          id="dealname"
          required="Deal name is required!"
          error={errors?.dealname?.message}
          showError
          type="text"
        />
        <Input
          register={register}
          label="Price"
          id="price"
          required="Price is required!"
          error={errors?.price?.message}
          showError
          type="number"
          min="0"
          step="any"
        />

        <div className="flex-end mt-5">
          <Button
            disabled={isLoading || isUpdating}
            variant="dark"
            type="submit"
          >
            {isLoading || isUpdating ? 'Saving...' : ' Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

DealForm.propTypes = {
  selectProducts: PropTypes.arrayOf(PropTypes.object),
  onCloseModal: PropTypes.func,
  setSelectProducts: PropTypes.func,
  edit: PropTypes.bool,
  deal: PropTypes.object,
};

export default DealForm;
