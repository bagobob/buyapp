import './productList.css';
import {DataGrid} from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";
import { Link } from "react-router-dom"
import {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import {deleteProducts, getProducts} from "../../redux/apiCalls";

function ProductList(props) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    useEffect(()=>{
        getProducts(dispatch);
    },[dispatch]);

    const handleDelete = (id)=>{
        deleteProducts(id,dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName: 'Product', width: 250, renderCell: (params)=>{
                return(
                    <div className="productListIem">
                        <img className="productListImg" src={params.row.img} alt="avatar"/>
                        {params.row.title}
                    </div>
                )
            } },
        { field: 'inStock', headerName: 'Stock', width: 200 },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params => {
                return(
                    <>
                        <Link to={"/product/" +params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)} />
                    </>
                )
            })
        }
    ];
    return (
        <div className="productList">
            <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row)=> row._id}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default ProductList;