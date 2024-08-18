import { MdOutlineInventory2 } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';

import { useDispatch } from 'react-redux';
import { addItem } from '../inventorySlice';
const SendToKitchenForm = ({ item, onCloseModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item.ingredient.name,
      unit: item.ingredient.unit,

      quantity: item.quantity,
    },
  });

  const dispatch = useDispatch();

  // Handle submit to send data to kitchen
  const onSubmit = data => {
    console.log(item);
    dispatch(
      addItem({
        isMain: true,
        id: item.ingredient.id,
        name: data.name,
        unit: data.unit,
        ingredientID: item.ingredient.ingredientID,
        quantity: +data.quantity,
      }),
    );
    onCloseModal();
  };

  useEffect(() => {
    setValue('name', item.ingredient.name);
    setValue('unit', item.ingredient.unit);
    setValue('quantity', item.quantity);
  }, [item, setValue]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <MdOutlineInventory2 />
        <span>Send to Kitchen</span>
      </div>
      <div className="mx-10 mt-5 flex items-center gap-2 bg-primary-100 px-3 py-2 text-[1.2rem] text-primary-500">
        <span>Availabale:</span>
        <span>{item.ingredient.name}</span>
        <span>
          {item.quantity} {item.ingredient.unit}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 px-10">
        <Input
          register={register}
          type="text"
          disabled
          id="name"
          required={'Ingredient name is required!'}
          label="Ingredient"
          showError
          error={errors?.name?.message}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            register={register}
            type="text"
            disabled
            id="unit"
            required={'Unit is required!'}
            label="Unit"
            showError
            error={errors?.unit?.message}
          />
          <Input
            type="number"
            id="quantity"
            register={register}
            required={'Quantity is required!'}
            min={0}
            max={item.quantity}
            label="Quantity"
            showError
            error={errors?.quantity?.message}
          />
        </div>
        <div className="flex-end">
          <Button type="submit" variant="dark">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

SendToKitchenForm.propTypes = {
  item: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default SendToKitchenForm;
