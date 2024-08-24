import { Spinner } from '@chakra-ui/react';

const Spin = ({ size = 'xl' }) => {
 return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size={size} />
    </div>
 );
};

export default Spin;
