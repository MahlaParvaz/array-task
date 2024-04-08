import React from 'react';
import CreateArray from '../features/CreateArray';

const Home: React.FC = () => {
  return (
    <div>
      <header className="header">
        <div className="header__img">
          <img src="/public/img/wave.svg" alt="can't show image" />
        </div>
      </header>
      <CreateArray />
    </div>
  );
};

export default Home;
