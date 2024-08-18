import { useForm, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineInventory2 } from 'react-icons/md';

import Button from '../../../Components/UI/Button';
import { useGetIngredientsQuery } from '../../../services/apiIngredients';
import Spinner from '../../../Components/UI/Spinner';
import Input from '../../../Components/UI/Input';
import {
  useAddItemToMainInventoryMutation,
  useUpdateItemOfMainInventoryMutation,
} from '../../../services/apiMainInventory';

const MainInventoryForm = ({ edit, item, onCloseModal }) => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { data: ingData, isLoading: isIngLoading } =
    useGetIngredientsQuery('all');
  const [addItem, { isLoading, isSuccess, reset: resetAddState }] =
    useAddItemToMainInventoryMutation();
  const [
    updateItem,
    { isLoading: isUpdating, isSuccess: isUpdated, reset: resetUpdateState },
  ] = useUpdateItemOfMainInventoryMutation();

  // Watch ingredient field whenever changes change the unit too
  const ingredientWatch = useWatch({
    control,
    name: 'ingredient',
  });

  // Handle submit
  const onSubmit = data => {
    if (edit) {
      updateItem({ id: item.id, data: { quantity: data.quantity } });
    } else {
      addItem({ id: data.ingredient, data: { quantity: +data.quantity } });
    }
  };

  // Handle success or error state
  useEffect(() => {
    if (isUpdated) {
      resetUpdateState();
      onCloseModal();
      toast.success(`${item.ingredient.name} data updated!`);
    }
    if (isSuccess) {
      resetAddState();
      onCloseModal();
      toast.success('Stock successfully added!');
    }
  }, [
    isUpdated,
    isSuccess,
    resetUpdateState,
    resetAddState,
    onCloseModal,
    item,
  ]);

  // Handle default values when changes
  useEffect(() => {
    if (!ingData || !edit) return;
    setValue('ingredient', item.ingredient.id);
    setValue('unit', item.ingredient.unit);
    setValue('quantity', item.quantity);
  }, [ingData, edit, item, setValue]);

  useEffect(() => {
    const ingID = getValues().ingredient;
    const unit = ingData?.find(itm => +itm.id === +ingID)?.unit;
    setValue('unit', unit);
    // console.log(ingredientWatch);
  }, [ingredientWatch]);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <MdOutlineInventory2 />
        <span>{edit ? 'Edit' : 'Add new'} Stock</span>
      </div>
      {isIngLoading && (
        <div className="my-20 flex justify-center">
          <Spinner />
        </div>
      )}
      {!isIngLoading && (
        <form
          className="mt-4 flex flex-col gap-3 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Ingredients */}

          <div
            className="
          flex flex-col gap-3"
          >
            <label
              className="text-[1rem] font-[500] sm:text-[1rem] md:text-[1.2rem]"
              htmlFor="ingredient"
            >
              Ingredients *
            </label>
            <select
              disabled={isLoading}
              className="cursor-pointer rounded-md border-2 border-gray-300 bg-transparent  px-4 py-2 text-[1.1rem] outline-none focus:border-primary-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-80"
              id="ingredient"
              defaultValue={ingData?.at(0)?.ingredientID}
              {...register('ingredient', {
                required: 'Please select an ingredient',
              })}
            >
              {ingData?.map((ing, i) => (
                <option key={i} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <span className="text-[0.8rem] text-red-500">
              {errors?.ingredient?.message}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              register={register}
              type="text"
              id="unit"
              label="Unit"
              disabled
            />
            <Input
              register={register}
              type="number"
              min={0}
              id="quantity"
              label="Quantity"
              disabled={isLoading}
            />
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              // disabled={isLoading}
              type="submit"
              className="px-10"
              variant="dark"
            >
              {isLoading || isUpdating ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

MainInventoryForm.propTypes = {
  edit: PropTypes.bool,
  item: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default MainInventoryForm;
