import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {ChakraProvider, Flex, Spinner} from "@chakra-ui/react";
import Home from "./pages/Home/Home";
import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, getBasket} from "./http/userAPI";

const App = observer(() => {
    const {user} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            check().then(data => {
                if(data) {
                     user.setUser(data)
                     user.setIsAuth(true)
                    getBasket().then(basket => {
                        if(basket) {
                            user.setBasket(basket)
                        } else {
                            console.log('err with basket')
                        }

                    })

                } else {
                    user.setIsAuth(false)
                }
            }).finally(() => setIsLoading(false))



    },[])

    if(isLoading) {
        return(
        <ChakraProvider>
            <Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
                <Spinner size='xl'  />
            </Flex>
        </ChakraProvider>
        );
    }
        return (
            <ChakraProvider>
            <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </ChakraProvider>

        );


})

export default App;
