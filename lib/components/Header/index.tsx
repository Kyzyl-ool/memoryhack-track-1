import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getCount, getCountPhoto } from '../../mocks/heroes';
import { Statistic, Image } from 'semantic-ui-react';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export const Header: React.FC = props => {
  const styles = useStyles();
  const [count, setCount] = useState<number>();
  const [photoCount, setPhotoCount] = useState<number>();

  useEffect(() => {
    const fetchCount = async () => {
      setCount(await getCount());
      setPhotoCount(await getCountPhoto());
    };

    fetchCount();
  }, []);

  return (
    <header>
      <h1>Chain++</h1>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{count ? count : 'Загрузка...'}</Statistic.Value>
          <Statistic.Label>Объем выборки</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Image src={'https://mediasole.ru/data/images/75/75643/0_1233ed_75b67992_XXXL.jpg'} inline circular />
            {photoCount ? photoCount : 'Загрузка...'}
          </Statistic.Value>
          <Statistic.Label>Кол-во фотографий</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </header>
  );
};
