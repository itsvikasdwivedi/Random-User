import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TableContainer from '@mui/material/TableContainer';
import { InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setfilterTerm] = useState("");
  const [data, setdata] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [total_Pages, settotal_Pages] = useState(0);

  const pages = new Array(total_Pages).fill(null).map((v, i) => i);

  useEffect(() => {
    getDataFunction();
  }, [filterTerm]);
  const getDataFunction = () => {
    axios
      .get(`https://random-user-production.up.railway.app/user?page=${pageNumber}`)
      .then((res) => {
        settotal_Pages(res.data.totalPages);
        setdata(res.data.blog);

        // console.log(res.data.blog)
      })
      .catch((e) => console.log(e));
  };

  useEffect(
    () => {
      getDataFunction();
    },
    [pageNumber],
    [filterTerm]
  );

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(total_Pages - 1, pageNumber + 1));
  };

  const filterByGender = (e) => {
    axios
      .get(`https://random-user-production.up.railway.app/user/search/${e.target.value}`)
      .then((res) => {
        setdata(res.data);
        console.log(e.target.value);
        if (e.target.value == "Filter by Gender") {
          getDataFunction();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="user_page_container">
      <div className="filterdiv">
        <div>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            onChange={filterByGender}
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "12px",
              marginTop: "5%",
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </div>

        <div>
          <input
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "12px",
              marginTop: "5%",
            }}
            type="text"
            placeholder="Filter by Name..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="userTable_div">
        <TableContainer className="userTable">
          <Table>


            <TableHead>
              <TableRow>
              <TableCell>User Picture</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Nationality</TableCell>
                <TableCell>Pin</TableCell>
              </TableRow>
            </TableHead>

            {data
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.first.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((e) => {
                return (
                  <TableBody key={e._id}>
                     <TableRow>
                      
                      <TableCell>
                        <img src={e.picture} alt="img" />
                      </TableCell>
                      <TableCell>{e.first}</TableCell>
                      <TableCell>{e.last}</TableCell>
                      <TableCell>{e.gender}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.location}</TableCell>
                      <TableCell>{e.nat}</TableCell>
                      <TableCell>{e.pin}</TableCell>
        
                     </TableRow>
                    </TableBody>
                
                );
              })}
          </Table>
        </TableContainer>
      </div>

      <div className="pagination_container">
        <div className="pagination">
          <button onClick={gotoPrevious}>≪</button>
          {pages.map((pageIndex, i) => (
            <button key={i} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={gotoNext}>≫</button>
        </div>
      </div>
    </div>
  );
};

export default User;


