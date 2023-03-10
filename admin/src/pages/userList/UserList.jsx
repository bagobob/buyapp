import './userList.css';
import  { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";
import {userRows} from "../../dummyData";
import { Link } from "react-router-dom"
import {useState} from "react";

function UserList(props) {
    const [data, setData] = useState(userRows);
    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'Username', width: 200, renderCell: (params)=>{
            return(
                <div className="userListUser">
                    <img className="userListImg" src={params.row.avatar} alt="avatar"/>
                    {params.row.username}
                </div>
            )
            } },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Value',
            width: 160,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params => {
                return(
                    <>
                        <Link to={"/user/" +params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)} />
                    </>
                )
            })
        }
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default UserList;