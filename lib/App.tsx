import React from 'react';
import './App.scss';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from 'components/Header';
import { HeroesPage } from 'pages/SearchPage';
import { BrowserRouter, Route } from 'react-router-dom';
import { HeroPage } from 'pages/HeroPage';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '24px 60px 120px 60px'
  }
}));

function App() {
  const styles = useStyles();

  return (
    <BrowserRouter>
      <Container className={styles.root}>
        <Header />
        <hr />
        <Route path={'/search'}>
          <HeroesPage />
        </Route>
        <Route path={'/hero/:heroId'}>
          <HeroPage />
        </Route>
      </Container>
    </BrowserRouter>
  );
}

export default App;
