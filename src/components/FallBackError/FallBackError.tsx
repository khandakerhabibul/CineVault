import { useNavigate } from 'react-router-dom';

const FallBackError = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/content-list');
  };

  return (
    <div>
      Error Page
      <button onClick={handleBackHome}>Go to home</button>
    </div>
  );
};

export default FallBackError;
