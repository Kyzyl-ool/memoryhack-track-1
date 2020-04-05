import React, { useEffect, useState } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { getHero, heroes } from '../../mocks/heroes';
import { Box } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import './GroupPhotoPage.scss';
import { IHeroCard } from 'components/HeroCard';

const boundingBoxes = (dataId: number, onChoose: (id) => void, confirmed: number | null) => {
  const [choosen, setChoosen] = useState<number>(-1);
  useEffect(() => {
    onChoose(choosen);
  }, [choosen]);

  if (+dataId === 11) {
    return (
      <>
        {!confirmed || confirmed === 1 ? (
          <div className={`box box_1 ${choosen === 1 ? 'box_selected' : ''}`} onClick={() => setChoosen(1)} />
        ) : null}
        {!confirmed || confirmed === 2 ? (
          <div className={`box box_2 ${choosen === 2 ? 'box_selected' : ''}`} onClick={() => setChoosen(2)} />
        ) : null}
        {!confirmed || confirmed === 3 ? (
          <div className={`box box_3 ${choosen === 3 ? 'box_selected' : ''}`} onClick={() => setChoosen(3)} />
        ) : null}
      </>
    );
  } else {
    return null;
  }
};

const useQuery = () => {
  const loc = useLocation();
  return new URLSearchParams(loc.search);
};

export const GroupPhotoPage: React.FC = props => {
  const { dataId } = useParams();
  const q = useQuery();
  const [data, setData] = useState<IHeroCard>();
  const [hero, setHero] = useState<IHeroCard>();
  const [chosen, setChosen] = useState<number>(-1);
  const [confirmed, setConfirmed] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setData(heroes[dataId]);
      setHero(await getHero(q.get('for')));
    };

    fetchData();
  }, []);

  return (
    <Box textAlign={'center'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box position={'relative'}>
        <Image src={data && data.avatarSrc} className={'photo'} />
        {boundingBoxes(dataId, setChosen, confirmed.length > 0 ? chosen : null)}
      </Box>
      {+dataId === 11 ? (
        <Box>
          {confirmed ? (
            <h3>{confirmed}</h3>
          ) : (
            <Box mt={3}>
              <Button
                onClick={() => {
                  setConfirmed(
                    `Вы отметили, что ${hero && hero.lastName} ${hero && hero.firstName[0]}. ${hero &&
                      hero.patronym[0]} отсутствует на фотографии.`
                  );
                  setChosen(-1);
                }}
              >
                {hero && hero.lastName}&nbsp;{hero && hero.firstName && hero.firstName[0]}.&nbsp;
                {hero && hero.patronym && hero.patronym[0]}. отсутствует
              </Button>
              <Button
                disabled={chosen === -1}
                primary
                onClick={() =>
                  setConfirmed(
                    `${hero && hero.lastName} ${hero && hero.firstName[0]}. ${hero &&
                      hero.patronym[0]} отмечен на фотографии.`
                  )
                }
              >
                Подтвердить
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <h3>Фотография недоступна для разметки.</h3>
      )}
    </Box>
  );
};
