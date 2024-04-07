import { ThreeDots } from 'react-loader-spinner';

function Loading({ width = '65', height = '30' }) {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius={9}
      color="#6d28d9"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0',
      }}
      visible={true}
    />
  );
}
export default Loading;
