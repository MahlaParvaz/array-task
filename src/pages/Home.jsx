import CalculateArray from '../features/CalculateArray';

function Home() {
  return (
    <div>
      <header className="header">
        <div className="header__img">
          <img src="/public/img/wave.svg" alt="" />
        </div>
      </header>
      <CalculateArray />
    </div>
  );
}
export default Home;
