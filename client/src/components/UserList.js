import React from 'react'
import {useState,useEffect  } from "react";
import axios from "axios";
import Infinitescroll from 'react-infinite-scroll-component'



const UserList = () => {

const [users,setUsers]=useState([]);
const [lastId,setLastId]=useState(0)
const [tempId,settempId]=useState(0);

const [limit,setLimit]=useState(20);
const [keyword,setKeyword]=useState("");
const [query,setquery]=useState("")
const [hasMore,sethasMore]=useState(true);



useEffect(()=>{
    getUser();
},[lastId,keyword])

const getUser=async()=>{
    const response=await axios.get(`http://localhost:5000/users?search_query=${keyword}&lastId=${lastId}&limit=${limit}`);

    const newUser=response.data.result;
    setUsers([...users,...newUser])
    settempId(response.data.lastId)
    sethasMore(response.data.hasMore)

}
const searchUser=(e)=>{
    e.preventDefault()
  
    setLastId(0)
    setUsers([])
    setKeyword(query)
  
}

const fetchMore=()=>{
 setLastId(tempId)  
}




  return (
    <div className="container mt-5">
        <div className="columns">
            <div className="column is-centered">
                <form  onSubmit={searchUser}>
                    <div className="field has-addons">
                        <div className="control is-expaned">
                            <input type="text" 
                            className='input'
                            value={query}
                            onChange={(e)=>setquery(e.target.value)}
                            placeholder='cari'
                            />
                        </div>
                        <div className="control">
                            <button type='submit' className='button is-info'>
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                <Infinitescroll
                    dataLength={users.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={<h4>Loading..</h4>}
                
                >
                <table className='table is-striped is-bordered is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID</th> 
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index)=>(
                                  <tr key={index}>
                                  <td>{index+1}</td>
                                  <td>{user.id}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.gender}</td>
                              </tr>

                        ))}     
                    </tbody>
                </table>
                </Infinitescroll>
            </div>
        </div>
    </div>
    )
}

export default UserList