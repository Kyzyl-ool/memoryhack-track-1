import { IHeroCard } from 'components/HeroCard';
import { BACKEND_URL } from '../configs/config';
import axios from 'axios';

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const name = `Архипов Александр Михайлович.jpg
Зудов Петр Фролович.jpg
Калинин Игорь Федорович.jpg
Китаева Клавдия Александровна.jpg
Ковалев Анатолий Антонович.jpg
Копыльцов Николай Тихонович.png
Лазуков Павел Васильевич.jpg
Ларионов Георгий Васильевич.jpg
Марченко Евгений Игоревич.jpg
Маршалко Василий Тихонович.jpg
Мошенкин Александр Дорофеевич.jpg
Общая фото.jpg
Общая фотография.jpg
Общая_фотография_Зудов_Петр_Фролович_4.jpg
Общая_фотография_Китаева_Клавдия_Александровна.jpg
Общая_фотография_Китаева_Клавдия_Александровна_годовщина_части.png
Перов Алексей Иванович.jpg
Селивёрстов Николай Иванович.jpg`
  .split('\n')
  .map(value => value.split('.')[0].split(' '));

const times = [
  ['24.02.1944', '06.07.1945'],
  ['22.01.1943', '06.07.1945'],
  ['24.02.1941', '06.07.1945'],
  ['24.03.1945', '06.07.1945'],
  ['04.07.1943', '06.07.1945'],
  ['01.10.1944', '06.07.1945'],
  ['02.09.1943', '06.07.1945'],
  ['07.07.1944', '06.07.1945'],
  ['09.04.1944', '06.07.1945'],
  ['24.02.1941', '06.07.1945'],
  ['30.11.1944', '06.07.1945'],
  ['11.12.1944', '06.07.1945'],
  ['13.09.1940', '06.07.1945'],
  ['17.08.1944', '06.07.1945'],
  ['19.07.1943', '06.07.1945'],
  ['31.03.1944', '06.07.1945'],
  ['20.01.1942', '06.07.1945'],
  ['21.01.1941', '06.07.1945']
];

const placesOfBirth = [''];

const names: {
  lastName: string;
  firstName: string;
  patronym: string;
  common: boolean;
}[] = name.map(value => ({
  common: value.length !== 3,
  lastName: value[0],
  firstName: value[1],
  patronym: value[2]
}));

interface IBackendHeroEntry {
  id: number;
  years: string;
  lastname: string;
  firstname: string;
  patronymic: string;
  link: string;
  foto: string;
  region: string;
  rank: string;
  neighbours: number[];
}

export const getHeroes = async (): Promise<IHeroCard[]> => {
  const heroes: IBackendHeroEntry[] = (await axios.get(`${BACKEND_URL}/api/heroes`)).data;
  return heroes.map(value => ({
    id: value.id,
    patronym: value.patronymic,
    firstName: value.firstname,
    lastName: value.lastname,
    avatarSrc: value.foto,
    military: {
      part: value.region,
      rank: value.rank,
      activity: `${value.link}`,
      from: value.years,
      to: '',
      amountOfMilitaryActions: +(Math.random() * 100).toFixed(0)
    },
    common: false,
    placeOfBirth: value.region
  }));
};

export const heroesSearch = async (q: string): IHeroCard[] => {
  const res = await axios.get(`${BACKEND_URL}/api/heroes/search`, {
    params: {
      q
    }
  });
  return res.data.map(value => ({
    id: value.id,
    patronym: value.patronymic,
    firstName: value.firstname,
    lastName: value.lastname,
    avatarSrc: value.foto,
    military: {
      part: value.region,
      rank: value.rank,
      activity: `${value.link}`,
      from: value.years,
      to: '',
      amountOfMilitaryActions: +(Math.random() * 100).toFixed(0)
    },
    common: false,
    placeOfBirth: value.region
  }));
};

export const getCount = async (): Promise<number> => {
  const res = await axios.get(`${BACKEND_URL}/api/count`);
  return res.data.count;
};

export const getCountPhoto = async () => {
  const res = await axios.get(`${BACKEND_URL}/api/count/photo`);
  return res.data.count;
};

export const getHero = async (id: number): Promise<IHeroCard> => {
  const res = await axios.get(`${BACKEND_URL}/api/hero`, {
    params: {
      id
    }
  });
  return res.data.map(value => ({
    id: value.id,
    patronym: value.patronymic,
    firstName: value.firstname,
    lastName: value.lastname,
    avatarSrc: value.foto,
    military: {
      part: value.region,
      rank: value.rank,
      activity: `${value.link}`,
      from: value.years,
      to: '',
      amountOfMilitaryActions: +(Math.random() * 100).toFixed(0)
    },
    common: false,
    placeOfBirth: value.region
  }))[0];
};

export const heroes: IHeroCard[] = names.map((value, index) => ({
  ...value,
  avatarSrc: images[index],
  military: {
    from: times[index][0],
    to: times[index][1],
    amountOfMilitaryActions: (Math.random() * 100).toFixed(0),
    activity: 'начальник штаба',
    rank: 'полковник',
    part: '63 кд'
  },
  id: index,
  placeOfBirth: 'с. Сергеевка Никольского р-на Орловской обл.'
}));
