import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Input from '../../Components/UI/Input';
import Button from '../../Components/UI/Button';
import { HiX } from 'react-icons/hi';
import IconButton from '../../Components/UI/IconButton';
import { useDispatch } from 'react-redux';
import { addUserInfo } from '../cart/cartSlice';
import { useSearchParams } from 'react-router-dom';
const UserInfoForm = ({ onCloseModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const dispatch = useDispatch();

  const onSubmit = data => {
    document.body.style.overflow = 'visible';
    dispatch(addUserInfo(data));
  };

  return (
    <>
      <div className="absolute right-[1rem] top-[0.9rem] text-[1.2rem]">
        <IconButton onClick={onCloseModal} className="text-primary-500">
          <HiX />
        </IconButton>
      </div>
      <h1 className="mt-3 p-6 pb-0 text-[1.4rem] font-[600] capitalize text-primary-500 sm:p-10 sm:pb-0">
        Please fill out all the fields!
      </h1>
      <form className="flex flex-col gap-2 p-6 sm:gap-4 sm:p-10">
        <Input
          register={register}
          required="Name is required!"
          label="Name"
          id="name"
          type="text"
          error={errors?.name?.message}
          showError
        />
        <Input
          register={register}
          required="Phone number is required!"
          label="Phone"
          id="phone"
          type="tel"
          error={errors?.phone?.message}
          showError
        />
        {type === 'delivery' && (
          <Input
            register={register}
            required="Address is required!"
            label="Address"
            id="address"
            type="text"
            error={errors?.address?.message}
            showError
          />
        )}

        <div className="flex justify-end">
          <Button onClick={handleSubmit(onSubmit)} variant="dark" type="submit">
            Add Info
          </Button>
        </div>
      </form>
    </>
  );
};

UserInfoForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default UserInfoForm;
