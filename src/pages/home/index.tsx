import icon from '@assets/images/logo.svg';
import css from './index.module.css';
import cla from 'classnames';
import {FC} from 'react';
import {useCountState} from '@stores';

const Home: FC = function () {
  const {count, inc, dec} = useCountState();

  return (
    <div>
      1
    </div>
  );
};

export default Home;
