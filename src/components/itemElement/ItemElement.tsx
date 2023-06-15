import React from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import {IItem} from "../../models/IItem";
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../consts";
import {IBasket} from "../../store/UserStore";
import {addItemToBasket} from "../../http/userAPI";

interface ItemElementProps {
    item: IItem,
    basket: IBasket,
}

const ItemElement = ({item, basket}:ItemElementProps) => {
    const toast = useToast();

    let navigate = useNavigate();
    const handleAdd = () => {
        basket.id && addItemToBasket(basket.id, item.id).then(data => {
            if(data) {
                toast({
                    title: 'Товар добавлен в корзину.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Товар уже добавлен в корзину.',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                })
            }

        })
    }


    return (
        <Card maxW='xs' cursor={'pointer'} w={"100%"} onClick={() => navigate('/item/' + item.id)}>
            <CardBody  pb={'0'}>
                <Image height={'300px'} width={'100%'} maxW={'100%'} objectFit={'cover'}
                    src={SERVER_URL + item.img}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{item.name}</Heading>
                    <Flex  direction={['column', 'row']} justifyContent={'space-between'} alignItems={'center'}>
                        <Text color='blue.600' fontSize='2xl'>
                            {item.price} ₽
                        </Text>
                        {/*<Flex direction={['column', 'row']} alignItems={'center'} color='orange' fontSize='2xl'>*/}
                        {/*    <Text> {item.rating}</Text>*/}
                        {/*    <StarIcon />*/}
                        {/*</Flex>*/}
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter pt={'2'}>
                <ButtonGroup spacing='2' >
                    <Button variant='solid' colorScheme='blue'>
                        Купить
                    </Button>
                    <Button variant='ghost' colorScheme='blue' onClick={(e) => {
                        e.stopPropagation();
                        handleAdd()
                    }} >
                        Добавить в корзину
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default ItemElement;