import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, FormErrorMessage,
} from '@chakra-ui/react';
import {useContext, useState} from 'react';
import "./auth.scss"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {getBasket, login, registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user, item} = useContext(Context);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation()
    const isLogin = location.pathname === '/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isError, setIsError] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isRegisterEmpty, setIsRegisterEmpty] = useState<boolean>(false);


    const registerHandler = async (email:string, password:string, name:string, lastName:string) => {
        try {
            let data = await registration(name, lastName, email, password);
            if(data) {
                navigate('/login')

            }
        } catch (err:any) {
            alert(err.response.data.message)
        }

    }

    const loginHandler = async (email:string, password:string) => {
            let data = await login(email, password);
            if(data) {
                user.setIsAuth(true)
                user.setUser(data)
                setIsError(false)
                getBasket().then(basket => {
                    if(basket) {
                        user.setBasket(basket)
                    } else {
                        console.log('err with basket')
                    }

                })
            } else {
                setIsError(true)
            }



    }

    if(isLogin) {
        return (
            <>
                <Navbar/>
                <Flex
                    minH="calc(100vh - 60px)"
                    align={'center'}
                    justify={'center'}
                    bg={'gray.50'}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'} textAlign={'center'}>
                                Авторизуйтесь
                            </Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                Время купить что-то полезное
                            </Text>
                        </Stack>
                        <Box
                            position={'relative'}
                            rounded={'lg'}
                            bg={'white'}
                            boxShadow={'lg'}
                            width={'md'}
                            p={8}>
                            {<Text fontSize='md' className={isEmpty? 'errorText active' : 'errorText'} textAlign={'center'} color='tomato'>Заполните все поля</Text>}
                            {<Text fontSize='md' className={isError? 'errorText active' : 'errorText'} textAlign={'center'} color='tomato'>Неверное имя пользователя или пароль</Text>}
                            <Stack spacing={4} mt={4}>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Адрес эл. почты</FormLabel>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Пароль</FormLabel>
                                    <InputGroup>
                                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        onClick={() => {
                                            setIsError(false)
                                            if(email && password) {
                                                loginHandler(email,password);

                                                setIsEmpty(false)
                                            } else {
                                                setIsEmpty(true)
                                            }
                                        }}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Войти
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Нет аккаунта? <Link href={'/register'} color={'blue.400'}>Зарегистрироваться</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </>

        );
    } else {
        return (
            <>
                <Navbar/>
                <Flex
                    minH="calc(100vh - 60px)"
                    align={'center'}
                    justify={'center'}
                    bg={'gray.50'}>

                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'} textAlign={'center'}>
                                Регистрация
                            </Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                ️Давайте знакомиться
                            </Text>
                        </Stack>
                        <Box
                            position={'relative'}
                            rounded={'lg'}
                            bg={'white'}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                {<Text fontSize='md' className={isEmpty? 'errorText active' : 'errorText'} textAlign={'center'} color='tomato'>Заполните все поля</Text>}
                                <HStack>
                                    <Box>
                                        <FormControl id="firstName" isRequired>
                                            <FormLabel>Имя</FormLabel>
                                            <Input type="text"  value={name} onChange={(e) => setName(e.target.value)}  />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="lastName">
                                            <FormLabel>Фамилия</FormLabel>
                                            <Input type="text"  value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Адрес эл. почты</FormLabel>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Пароль</FormLabel>
                                    <InputGroup>
                                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        onClick={() => {
                                            if(email && password  && name && lastName) {
                                                registerHandler(email,password, name, lastName);

                                                setIsEmpty(false)
                                            } else {
                                                setIsEmpty(true)
                                            }

                                        }}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Зарегистрироваться
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Уже есть аккаунт? <Link href={"/login"} color={'blue.400'}>Войти</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </>

        );
    }

})
export default Auth;