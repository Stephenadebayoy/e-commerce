import { makeStyles } from '@material-ui/core/styles';
import { hover } from '@testing-library/user-event/dist/hover';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    '&:hover': {
      transform: 'scale(1.35)',
      transition: '2s',
    },
  },

  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
