import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container, Image } from 'semantic-ui-react';
import { heroes } from '../../mocks/heroes';
import './HeroPage.scss';

export const HeroPage: React.FC = props => {
  const { heroId } = useParams();
  const history = useHistory();
  const data = heroes[heroId];

  return (
    <div>
      <h3>Информация по участнику Великой Отечественной Войны:</h3>
      <Button onClick={() => history.goBack()}>Назад</Button>
      <div className={'hero-page__content'}>
        <Container>
          <Image src={data.avatarSrc} rounded size={'medium'} />
          <h3>
            {data.lastName} {data.firstName} {data.patronym}
          </h3>
        </Container>
      </div>
    </div>
  );
};
