import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Image, Segment } from 'semantic-ui-react';
import { getHero, heroes } from '../../mocks/heroes';
import './HeroPage.scss';
import { Box, GridList, GridListTile, GridListTileBar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { IHeroCard } from 'components/HeroCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
      // backgroundColor: theme.palette.background.paper
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    title: {
      fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
      // color: theme.palette.primary.light
    },
    titleBar: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    }
  })
);

export const HeroPage: React.FC = props => {
  const { heroId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState<IHeroCard>();

  useEffect(() => {
    const fetchData = async () => {
      setData(await getHero(heroId));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Информация по участнику Великой Отечественной Войны:</h3>
      <Button onClick={() => history.goBack()}>Назад</Button>
      <div className={'hero-page__content'}>
        <Box display={'flex'} justifyContent={'space-evenly'}>
          <Image src={data && data.avatarSrc} rounded size={'medium'} />
          <Box display={'flex'} flexDirection={'column'}>
            <h1>
              {data && data.lastName} {data && data.firstName} {data && data.patronym}
            </h1>
            <b>{data && data.military.part}</b>
            <span>
              {data && data.military.from} – {data && data.military.to}
            </span>
            <span>{data && data.military.rank}</span>
            <span>{data && data.military.activity}</span>
            <span>Участвовал в {data && data.military.amountOfMilitaryActions} боевых действиях</span>
          </Box>
        </Box>
        <Box mt={3}>
          <h3>Служили в одной роте:</h3>
          <Segment secondary>
            <Box display={'flex'} flexWrap={'wrap'}>
              {heroes.map((value, index) => (
                <Box key={index} m={1} width={60} height={60}>
                  <Image src={value.avatarSrc} rounded className={'mini-image'} />
                </Box>
              ))}
            </Box>
          </Segment>
        </Box>
        <Box mt={3}>
          <h3>Служили в одном батальоне:</h3>
          <Segment secondary>
            <Box display={'flex'} flexWrap={'wrap'}>
              {heroes.map((value, index) => (
                <Box key={index} m={1} width={60} height={60}>
                  <Image src={value.avatarSrc} rounded className={'mini-image'} />
                </Box>
              ))}
            </Box>
          </Segment>
        </Box>

        <Box mt={3}>
          <h3>
            Возможно, {data && data.firstName} {data && data.patronym} есть на этих групповых фотографиях:
          </h3>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
              {heroes
                .filter(value => value.common)
                .map(value => (
                  <GridListTile
                    key={value.id}
                    className={'group-photo'}
                    onClick={() => history.push(`/photo/${value.id}?for=${data && data.id}`)}
                  >
                    <Image src={value.avatarSrc} rounded />
                    <GridListTileBar
                      title={value.lastName}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title
                      }}
                    />
                  </GridListTile>
                ))}
            </GridList>
          </div>
        </Box>
      </div>
    </div>
  );
};
