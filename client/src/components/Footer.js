import React from 'react'
import Copyright from './Copyright'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    }
  }));


export default function Footer() {
    const classes = useStyles();

    return (
    <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          MyNews Site
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          This site for developing purposes only!
        </Typography>
        <Copyright/>
      </footer>
    )
}
