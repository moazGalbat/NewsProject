import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import axiosInstance from '../api/axios'
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 0, 6),
  },
  grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));


export default function Sources() {
  const [userSources, setUserSources] = useState([])
  const [sources, setSources] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { currentUser } = useContext(UserContext)
  const classes = useStyles();

  useEffect(() => {
    axios.all([
      axiosInstance.get(`/users/${currentUser.id}/sources`),
      axiosInstance.get(`/sources`)
    ]).then(axios.spread((fUserSources, fSources) => {
      setUserSources(fUserSources.data);
      setSources(fSources.data.map(row => fUserSources.data.find(source => source === row.id) ? { ...row, tableData: { checked: true } } : row));
      setIsLoading(false);
    })).catch(e => {
      setError(true); 
      setIsLoading(false);
    });
  }, [])


  const postUserSelectedSources = (sources) => {
    axiosInstance.patch(`/users/${currentUser.id}/sources`, {
      sources: sources,
    }).then(result => {
      setSuccess(true)
    }).catch(e => {
      setSuccess(false)
      setError(true); 
    });
  }

  const handleSelect = (evt, data) => {
    const selectedSources = data.map((source) => {
      return source.id;
    })
    postUserSelectedSources(selectedSources)
  }

  const handleClose = (event) => {
    setSuccess(false);
    setError(false)  
  };

  return (
    <Container className={classes.container}>
      {success && <Alert onClose={handleClose} severity="success">Subscribed Successfully!</Alert> }
      {error && <Alert onClose={handleClose} severity="error">Something went wrong! Check Your Internet Connection and try again!</Alert> }
      {isLoading  ?
            <Grid container justify = "center" className={classes.grid}>
            <CircularProgress />
            </Grid>:
      <MaterialTable
        title="Sources"
        columns={[
          { title: 'Name', field: 'name', customSort: (a, b) => a.name.localeCompare(b.name), sorting: true, grouping: false },
          { title: 'Description', field: 'description', sorting: false, grouping: false },
          { title: 'language', field: 'language', sorting: false, grouping: true },
          { title: 'Category', field: 'category', sorting: false, grouping: true }
        ]}
        data={sources}
        actions={[
          {
            tooltip: 'Subscribe to selected sources',
            icon: 'save',
            onClick: handleSelect
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          grouping: true,
          selection: true,
        }}
      />
      } 
    </Container>
  )
}
