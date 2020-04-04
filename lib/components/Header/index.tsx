import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { heroes } from '../../mocks/heroes';
import { Statistic, Image } from 'semantic-ui-react';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export const Header: React.FC = props => {
  const styles = useStyles();

  return (
    <header>
      <h1>Chain++</h1>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{heroes.filter(value => !value.common).length}</Statistic.Value>
          <Statistic.Label>Объем выборки</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Image src={'https://mediasole.ru/data/images/75/75643/0_1233ed_75b67992_XXXL.jpg'} inline circular />
            {heroes.length}
          </Statistic.Value>
          <Statistic.Label>Кол-во портретов</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </header>
  );
};
