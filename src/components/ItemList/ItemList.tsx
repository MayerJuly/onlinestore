import {Context} from "../../index";
import {useContext} from "react";
import {Box, Flex, Stack} from "@chakra-ui/react";
import ItemElement from "../itemElement/ItemElement";
import {observer} from "mobx-react-lite";



const ItemList = observer(() => {
    const {item, user} = useContext(Context);

    return (
        <Flex w={'100%'} justifyContent={'space-evenly'} flexWrap={'wrap'} direction={['column', 'row']} gap={'30px'} >
            {item.items.map(element =>
                <ItemElement key={element.id} item={element}  basket={user.basket}/>
            )}
        </Flex>
    );
});

export default ItemList;