import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

export default function NewsCard({article}) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={8} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={article.urlToImage!=="null"? article.urlToImage:process.env.PUBLIC_URL + '/defaultNewsImage.png'}
                    title={article.title}
                  />
                  <CardContent className={classes.cardContent}>
                  <Typography variant="overline" display="block" >
                        {article.author? `Author: ${article.author}, `:null}
                        Source: {article.source.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {article.title}
                    </Typography>
                    <Typography>
                        {article.description}
                    </Typography>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                    <Link href={article.url} target="_blank" underline="none" rel="noopener">
                        View
                    </Link>
                    </Button>
                    <Typography variant="caption" display="block" gutterBottom>
                        {new Date(article.publishedAt).toLocaleString()}
                    </Typography>
                  </CardActions>
                </Card>
        </Grid>
    )
}
