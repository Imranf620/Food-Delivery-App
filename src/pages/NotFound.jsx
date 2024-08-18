import { useNavigate } from "react-router-dom";
import Button from "../Components/UI/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-full flex-center gradient">
      <div className="w-[600px] shadow-lg rounded-lg bg-white p-10">
        <h1 className="font-[700] text-center flex flex-col gap-4">
          <span className="text-[2.5rem]">404</span>
          <span className="text-[1.5rem]">
            The Page you are looking for is not found!
          </span>
        </h1>
        <div className="mt-5 flex justify-center">
          <Button
            onClick={() => navigate(-1, { replace: true })}
            variant="underline"
          >
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
