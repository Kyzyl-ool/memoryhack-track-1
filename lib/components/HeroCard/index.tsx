import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import './HeroCard.scss';
import { useHistory } from 'react-router-dom';

export interface IHeroCard {
  lastName: string;
  firstName: string;
  patronym: string;
  military: {
    part: string;
    from: string;
    to: string;
    rank: string;
    activity: string;
    amountOfMilitaryActions: number;
  };
  avatarSrc: string;
  placeOfBirth: string;
  id: number;
  common: boolean;
}

export const HeroCard: React.FC<Partial<IHeroCard>> = props => {
  const history = useHistory();

  return (
    <div className={'hero-card'} onClick={() => history.push(`/hero/${props.id}`)}>
      <Card fluid>
        <Image src={props.avatarSrc} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {props.lastName} {props.firstName} {props.patronym}
          </Card.Header>
          <Card.Meta>
            {props.military.from}–{props.military.to}
          </Card.Meta>
          <Card.Description>
            <b className="date">{props.military.part}</b>
            <br />
            <span>{props.military.rank}</span>
            <br />
            <span>{props.military.activity}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="map pin" />
          Принимал(-а) участие в{' '}
          {props.military.amountOfMilitaryActions
            ? props.military.amountOfMilitaryActions
            : (Math.random() * 100).toFixed(0)}{' '}
          боевых действиях
        </Card.Content>
      </Card>
    </div>
  );
};
