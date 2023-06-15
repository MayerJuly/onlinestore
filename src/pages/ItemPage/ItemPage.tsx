import "./itemPage.scss"
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    List,
    ListItem,
    SimpleGrid,
    Spinner,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
    useToast,
    VStack,
} from '@chakra-ui/react';
import Navbar from "../../components/Navbar/Navbar";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneItem} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";
import {IItem} from "../../models/IItem";
import {SERVER_URL} from "../../consts";
import {addItemToBasket} from "../../http/userAPI";
import {Context} from "../../index";


export interface ItemInfoProps {
    title: string,
    description: string
}
 export interface ItemProps extends IItem{
    info:ItemInfoProps[]
}

const ItemPage = observer(() => {
    const {user} = useContext(Context)
    const [item, setItem] = useState<ItemProps>()
    useEffect(() => {
        id && fetchOneItem(id).then(data => setItem(data))
    }, [])

    const toast = useToast();
    const {id} = useParams()

    const handleAdd = () => {
        user.basket.id && item &&  addItemToBasket(user.basket.id, item.id).then(data => {
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

        <>
            {item?  <>
                <Navbar/>
                <Container maxW={'7xl'}>
                    <SimpleGrid
                        columns={{ base: 1, lg: 2 }}
                        spacing={{ base: 8, md: 10 }}
                        py={{ base: 18, md: 24 }}>
                        <Flex>
                            <Image
                                rounded={'md'}
                                alt={'product image'}
                                src={SERVER_URL + item.img}
                                fit={'contain'}
                                align={'center'}
                                w={'100%'}
                                maxH={"100%"}
                                h={{ base: '100%', sm: '500px', lg: '600px' }}
                            />
                        </Flex>
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Box as={'header'}>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '2xl', sm: '4xl', lg: '38px' }}>
                                    {item.name}
                                </Heading>
                                <Flex gap={'25px'} direction={['column', 'row']} alignItems={'center'}>
                                    <Text
                                        color={'gray.900'}
                                        fontWeight={400}
                                        fontSize={'3xl'}>
                                        {item.price} ₽
                                    </Text>
                                    {/*<Flex direction={['column', 'row']} alignItems={'center'} color='orange' fontSize='2xl'>*/}
                                    {/*    <Text> {item.rating}</Text>*/}
                                    {/*    <StarIcon />*/}
                                    {/*</Flex>*/}
                                </Flex>

                            </Box>

                            <Stack
                                spacing={{ base: 4, sm: 6 }}
                                direction={'column'}
                                divider={
                                    <StackDivider
                                        borderColor={'gray.200'}
                                    />
                                }>
                                <VStack spacing={{ base: 4, sm: 6 }}>
                                    <Text
                                        color={'gray.600'}
                                        fontSize={'lg'}
                                        whiteSpace={'pre-line'}
                                        fontWeight={'400'}>
                                        {item.desc}
                                    </Text>

                                </VStack>
                                <Box>
                                    <Text
                                        fontSize={{ base: '16px', lg: '18px' }}
                                        color={'yellow.500'}
                                        fontWeight={'500'}
                                        textTransform={'uppercase'}
                                        mb={'4'}>
                                        Подробные характеристики
                                    </Text>

                                    <List spacing={2}>
                                        {item.info.map(info =>
                                            <ListItem key={info.title}>
                                                <Text as={'span'} fontWeight={'bold'}>
                                                    { info.title}:
                                                </Text>{' '}
                                                {info.description}
                                            </ListItem>
                                        )}
                                    </List>
                                </Box>
                            </Stack>

                            <Button
                                onClick={handleAdd}
                                rounded={'none'}
                                w={'full'}
                                mt={8}
                                size={'lg'}
                                py={'7'}
                                bg={'gray.900'}
                                color={'white'}
                                textTransform={'uppercase'}
                                _hover={{
                                    transform: 'translateY(2px)',
                                    boxShadow: 'lg',
                                }}>
                                Добавить в корзину
                            </Button>

                        </Stack>
                    </SimpleGrid>
                </Container>
            </> : <Flex alignItems={'center'} justifyContent={'center'} h={'100vh'}><Spinner size={'xl'}/></Flex>}


        </>
    );
})

export default ItemPage;