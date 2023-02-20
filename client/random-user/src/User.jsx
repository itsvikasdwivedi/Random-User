import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles/User.css";

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
      .get(`https://random-user-qw68.onrender.com/user?page=${pageNumber}`)
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
      .get(`https://random-user-qw68.onrender.com/user/search/${e.target.value}`)
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
          <select
            onChange={filterByGender}
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "12px",
              marginTop: "5%",
            }}
          >
            <option>Filter by Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
        <table className="userTable">
          <thead>
            <tr>
              <th>User Picture</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Location</th>
              <th>Nationality</th>
              <th>Pin</th>
            </tr>
          </thead>
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
                <tbody key={e._id}>
                  <tr>
                    <td>
                      <img src={e.picture} alt="img" />
                    </td>
                    <td>{e.first}</td>
                    <td>{e.last}</td>
                    <td>{e.gender}</td>
                    <td>{e.email}</td>
                    <td>{e.location}</td>
                    <td>{e.nat}</td>
                    <td>{e.pin}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>

      <div className="pagination_container">
        {/* <div>Page No. : {pageNumber + 1}</div> */}
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


