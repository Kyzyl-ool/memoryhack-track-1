import React, { useEffect, useState } from 'react';
import { HeroCard, IHeroCard } from 'components/HeroCard';
import { heroesSearch, getHeroes } from '../../mocks/heroes';
import { Input } from 'semantic-ui-react';
import './SearchPage.scss';
import _debounce from 'lodash/debounce';

export const HeroesPage: React.FC = props => {
  const [foundHeroes, setFoundHeroes] = useState<IHeroCard[]>([]);

  const fetchData = _debounce(async (searchString: string) => {
    if (searchString.length > 0) {
      const res: IHeroCard[] = await heroesSearch(searchString);
      setFoundHeroes(res);
    }
  }, 300);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHeroes();
      setFoundHeroes(res);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Поиск по выборке:</h3>
      <Input placeholder={'Фамилия, Имя, Отчество...'} onChange={event => fetchData(event.target.value)} fluid />
      <div className={'search-page__search-result'}>
        {foundHeroes.map((value, index) => (
          <HeroCard key={index} {...value} />
        ))}
      </div>
    </div>
  );
};
