import { useForm } from 'react-hook-form';
import Input from '../../Components/UI/Input';
import Button from '../../Components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/apiAuth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, reset, error }] = useLoginMutation();
  const onSubmit = data => {
    login({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successfully!', { autoClose: 3000 });
      navigate('/home');
      reset();
    }
    if (error) {
      toast.error(error?.data?.error);
      reset();
    }
  }, [isSuccess, reset, error, navigate]);

  return (
    <form
      className="flex w-[90%] flex-col gap-6 rounded-md bg-gray-50 px-8 py-8 shadow-md sm:w-[500px] sm:px-12 sm:py-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-[2rem] font-[500] ">Login</h1>
      {/* Email Input */}
      <Input
        label="Email"
        type="email"
        required="Please enter you Email!"
        placeholder="name@example.com"
        register={register}
        id="email"
        error={errors?.email?.message}
      />
      {/* Password Input */}
      <Input
        label="Password"
        required="Please enter you Password!"
        register={register}
        type="password"
        id="password"
        error={errors?.password?.message}
        placeholder="••••••••"
      />

      {/* Login Button */}
      <Button
        type="submit"
        variant="dark"
        className="mt-6 text-[1.4rem] sm:mt-8"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
      <div className="text-center text-[0.9rem] ">
        Don't have an account? Signup
      </div>
    </form>
  );
};

export default Login;
