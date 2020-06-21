import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import axios from '../api/axios'
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';


  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
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
    const [error, setError] = useState(null);

    const classes = useStyles();


    useEffect(() => {
        window.scrollTo(0, 0)
        setError(null);
        axios.get(`/news?pageSize=10&page=${page}`)
            .then(res => {
                setArticles(res.data.articles);
                if(res.data.totalResults<=100) setTotalResult(res.data.totalResults)
                else setTotalResult(100)
                setIsLoading(false);
            })
            .catch(e => { 
              if (e.response.status === 422){
                setError(422);
              }
              else {
                setError(500);
              }
              setIsLoading(false);
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
        {/* Header */}
        <Header/>
        {/* End Header */}

        {/* Loading Spinner */}
        {isLoading  &&
            <Grid container justify = "center" className={classes.cardGrid}>
            <CircularProgress />
        </Grid>} 
        {/* End Loading Spinner */}

        {/* Errors */}
        {error && (error === 422? 
            <Grid container justify = "center" className={classes.cardGrid}>
            <div style={{color: `red`}}>You haven't subscribed to any sources yet. </div>
              <Link component={RouterLink} to="/sources" variant="body2">
                              {"Subscribe Now!"}
              </Link>
            </Grid>:
            <Grid container justify = "center" className={classes.cardGrid}>
                <div style={{color: `red`}}>ٍome error occurred, while fetching api</div>
            </Grid>
        )}
        {/* End Errors */}

        {/* Body */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {articles.map((article,index) => <NewsCard key={index} article={article}/>)}
          </Grid>
        </Container>
        {/* End Body */}


        {/* Pagination */}
        <Grid container justify = "center" >
              <div className={classes.pagination}>
              <Pagination count={Math.ceil(totalResult/12)} page={page} onChange={handleChange} color="primary" variant="outlined" showFirstButton showLastButton/>
          </div>
        </Grid>
        {/* End Pagination */}

      </main>
      
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </React.Fragment>
    )
}
