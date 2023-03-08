import './newProduct.css';
import {useState} from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import {addProducts} from "../../redux/apiCalls";
import {useDispatch} from "react-redux";


function NewProduct() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        setInputs(prevState=>{
            return { ...prevState, [e.target.name]: e.target.value}
        })
    }
    const handleCategories = (e) =>{
        setCategories(e.target.value.split(","));
    }
    const handleColor = (e) =>{
        setColor(e.target.value.split(","));
    }
    const handleSize = (e) => {
        setSize(e.target.value.split(","));
    }

    const handleClick = (e) =>{
        e.preventDefault();
        const filename =new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, img: downloadURL, categories: categories, color: color, size:size}
                    addProducts(product, dispatch);
                });
            }
        );
    }
    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Fenty Savage" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="text" name="desc" placeholder="Description" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input type="number" name="price" placeholder="120€" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input type="text" name="categories" placeholder="jeans, skirts" onChange={handleCategories}/>
                </div>
                <div className="addProductItem">
                    <label>Color</label>
                    <input type="text" name="color" placeholder="red, blue" onChange={handleColor}/>
                </div>
                <div className="addProductItem">
                    <label>Size</label>
                    <input type="text" name="size" placeholder="S, XL, XXL" onChange={handleSize}/>
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock" id="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button onClick={handleClick} className="addProductButton">Create</button>
            </form>
        </div>
    );
}

export default NewProduct;