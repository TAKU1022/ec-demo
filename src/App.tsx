import Router from './router/Router';
import './assets/reset.css';
import './assets/style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(
  createStyles({
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: 1,
      padding: '96px 0',
    },
  })
);

const App = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Header />

      <main className={classes.main}>
        <Router />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default App;
