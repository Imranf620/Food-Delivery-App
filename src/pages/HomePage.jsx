import { useEffect } from 'react';
import Menu from '../features/menu/Menu';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    searchParams.delete('table');
    setSearchParams(searchParams);
  }, []);
  return <Menu />;
};

export default HomePage;
