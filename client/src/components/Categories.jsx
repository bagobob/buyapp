import styled from 'styled-components';
import { categories} from "../data";
import CategoryIem from "./CategoryItem";
import  {mobile} from "../responsive";

const Container = styled.div`
        display: flex;
        padding: 20px;
        justify-content: space-between;
      ${mobile({padding: "0px", flexDirection: "column" })};
    `;

export default function Categories (){
    return(
        <Container>
            {categories.map( (item)=> (
                <CategoryIem item={item} key={item.id}/>
            ))}
        </Container>
    )
}