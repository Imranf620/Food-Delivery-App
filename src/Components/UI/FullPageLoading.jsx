import Spinner from './Spinner';

const FullPageLoading = () => {
  return (
    <div className="flex-center absolute inset-0 bg-white">
      <Spinner />
    </div>
  );
};

export default FullPageLoading;
