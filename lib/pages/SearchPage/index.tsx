import React, { useState } from 'react';
import { HeroCard } from 'components/HeroCard';
import { heroes } from '../../mocks/heroes';
import { Input } from 'semantic-ui-react';
import './SearchPage.scss';

export const HeroesPage: React.FC = props => {
  const [searchString, setSearchString] = useState<string>('');

  return (
    <div>
      <h3>Поиск по выборке:</h3>
      <Input placeholder={'Фамилия, Имя, Отчество...'} onChange={event => setSearchString(event.target.value)} fluid />
      <div className={'search-page__search-result'}>
        {heroes
          .filter(value => !value.common)
          .filter(value =>
            `${value.lastName} ${value.firstName} ${value.patronym}`.toUpperCase().includes(searchString.toUpperCase())
          )
          .map((value, index) => (
            <HeroCard key={index} {...value} />
          ))}
      </div>
    </div>
  );
};
