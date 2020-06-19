import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import axios from '../api/axios'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    headerButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
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
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    pagination: {
        paddingBottom: theme.spacing(8),
        margin: "auto",
      }
  }));
  
export default function Home() {
    const [articles, setArticles] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false);

    const classes = useStyles();


    useEffect(() => {
        window.scrollTo(0, 0)
        setError(false);
        axios.get(`/news?pageSize=10&page=${page}`)
            .then(res => {
                setArticles(res.data.articles);
                if(res.data.totalResults<=100) setTotalResult(res.data.totalResults)
                else setTotalResult(100)
                setIsLoading(false);
            })
            .catch(e => {
                setError(true);
                setIsLoading(false);
                // console.log(e.response)
            })
    },[page])

    const handleChange = (event, value) => {
        setIsLoading(true);
        setPage(value);
    };

    return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.header}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              My News
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Get news articles from the sources you choose to keep your self updated about the outer world.
            </Typography>
            <div className={classes.headerButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {isLoading  &&
            <Grid container justify = "center" className={classes.cardGrid}>
            <CircularProgress />
        </Grid>} 
        {error  &&
            <Grid container justify = "center" className={classes.cardGrid}>
            <div style={{color: `red`}}>some error occurred, while fetching api</div>
        </Grid>}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {articles.map((article,index) => (
              <Grid item key={index} xs={12} sm={8} md={4}>
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
            ))}
          </Grid>
          
        </Container>
        <Container maxWidth="sm">
        <div className={classes.pagination}>
            <Pagination count={Math.ceil(totalResult/12)} page={page} onChange={handleChange} color="primary" variant="outlined" showFirstButton showLastButton/>
        </div>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    )
}
