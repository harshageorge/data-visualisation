import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataList from "./DataList";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {UserContext} from './Auth-context';

import {
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider,
  Typography,
  Grid,
  Pagination,
} from "@mui/material";
import { AppContext } from "./app-context";
const BoxWrapper = styled(Box)(({ theme }) => ({
  padding: "10px",
}));
const PaginationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

function SearchPage() {
  const [tasks, setTasks] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([tasks]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);

  const { getSelectedListId, sethistoricalData, setchartData } =
    useContext(AppContext);
    const {user} =useContext(UserContext);
  const [sortValue, setsortValue] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get(
          "https://jsonplaceholder.typicode.com/users"
        )
        .then((res) => {
          console.log(res.data);
          setAllData(res.data);
          setTasks(res.data);
          setFilteredData(res.data);
          if (res) {
            setLoading(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPosts();
  }, []);

  // Change page
  const handleChange = (event) => {
    let result = [];
    setsortValue(event.target.value);
    console.log(event.target.value);
    if (event.target.value == "name") {
      result = filteredData.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setFilteredData(result);
    
    } else {
      result = filteredData.sort(function (a, b) {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
      setFilteredData(result);
    } 
  };
  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    console.log(event);
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = tasks.filter((data) => {
      return (
        data.name.toLowerCase().search(value) != -1 ||
        data.username.toLowerCase().search(value) != -1 ||
        data.email.toLowerCase().search(value) != -1
      );
    });
    setFilteredData(result);
  };

  // Get current tasks
  function getCurrentTasks(tasks) {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return tasks.slice(indexOfFirstTask, indexOfLastTask);
  }
  const fetchChartData = () => {
    navigate("/chart");
    // let array = [];
    // array.push(getSelectedListId);
    // var newArr = JSON.parse("[" + array.join() + "]");
    // newArr.forEach(function (element, index) {
    //   newArr[index] = [element + ",A1,lastmax&n=1&r=week&i=minute"];
    // });
    // console.log(newArr);
   
    // let source = newArr.join("").toString();
 
    // let APIToken = JSON.parse(localStorage.getItem("Token"));
    // let axiosConfig = {
    //   headers: {
    //     Authorization: "Bearer " + APIToken,
    //   },
    // };
    // axios
    //   .get(
    //     `https://user.windcrane.com/manager/api/v1/historic?s=${source}`,
    //     axiosConfig
    //   )
    //   .then((resData) => {
    //     console.log(resData);
    //     setchartData(resData.data);
    //     if (resData.data) {
    //       navigate("/chart");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const getHistoricData = () => {
    let selectedData = [];
    for (const listId in getSelectedListId) {
      console.log(getSelectedListId[listId]);
      let selectedListItems = allData.filter(
        (item) => item.id == getSelectedListId[listId]
      );
      selectedData.push(selectedListItems);
    }
    console.log(selectedData);
    sethistoricalData(selectedData);
    fetchChartData();
    return selectedData;
  };
  return (
    <Container maxWidth="lg" sx={{ padding: "10px",marginTop:'20px' }}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "5px" }}>
        <TextField
          label="Search"
          placeholder="Start typing Name or Username or Email"
          sx={{ width: "90%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleSearch(event)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent:'space-between',
            gap: "5px",
            width: "90%",
            marginTop: "20px",
          }}
        >
          <Box sx={{ minWidth: 170 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortValue}
                label={sortValue}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"username"}>Username</MenuItem>
                </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            size='small'
            disabled={getSelectedListId.length === 0}
            onClick={() => getHistoricData()}
            style={{
            
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "13px",
            }}
          >
            Get Data 
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <List>
              <ListItem style={{ display: "flex" }}>
                <ListItemText style={{ flex: "1 1 0" }}>
                  <Typography
                    style={{ fontWeight: 600 }}
                    variant="subtitle2"
                    color="primary"
                  ></Typography>
                </ListItemText>
                <ListItemText style={{ flex: "3 1 0" }}>
                  <Typography
                    style={{ fontWeight: 600 }}
                    variant="subtitle2"
                    color="primary"
                  >
                    Name
                  </Typography>
                </ListItemText>
                <ListItemText
                  style={{
                    flex: "3 1 0",
                  }}
                >
                  <Typography
                    style={{ fontWeight: 600 }}
                    variant="subtitle2"
                    color="primary"
                  >
                    {" "}
                    Username
                  </Typography>
                </ListItemText>
                <ListItemText
                  style={{
                    flex: "3 1 0",
                  }}
                >
                  <Typography
                    style={{ fontWeight: 600 }}
                    variant="subtitle2"
                    color="primary"
                  >
                    {" "}
                    Email
                  </Typography>
                </ListItemText>
                <ListItemText
                  style={{
                    flex: "2 1 0",
                  }}
                >
                  <Typography
                    style={{ fontWeight: 600 }}
                    variant="subtitle2"
                    color="primary"
                  >
                    {" "}
                    Website
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
            <Divider style={{ marginRight: "12px" }} />

            <DataList tasks={getCurrentTasks(filteredData)} loading={loading} />
            <PaginationWrapper>
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(filteredData.length / tasksPerPage)}
                page={currentPage}
                color="primary"
              />
            </PaginationWrapper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SearchPage;
