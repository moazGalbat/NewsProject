import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    }
  }));





export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.header}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            My News
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Get news articles from the sources you choose to keep your self updated about the outer world.
          </Typography>
        </Container>
      </div>
    )
}
