import "./admin.scss"
import {Button, Container, Flex, Text, useColorModeValue} from "@chakra-ui/react"
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import CreateType from "../../components/modals/CreateType";
import CreateItem from "../../components/modals/CreateItem";
import CreateBrand from "../../components/modals/CreateBrand";

const Admin = () => {
    return (
        <>
            <Navbar/>
            <Container maxW={'7xl'}
                           py={{ base: 2, md: 5 }}>
                <Text fontSize={'3xl'} mb={'2'} fontWeight={'500'}>
                    Панель Администратора
                </Text>
                <Flex flexDirection={'column'} gap={'4'}>
                    <CreateBrand/>
                    <CreateType/>
                    <CreateItem/>

                </Flex>

            </Container>
        </>

    );
};

export default Admin;