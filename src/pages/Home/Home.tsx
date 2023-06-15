import "./home.scss"
import Navbar from "../../components/Navbar/Navbar";
import Typebar from "../../components/Typebar/Typebar";
import ItemList from "../../components/ItemList/ItemList";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchBrands, fetchDevices, fetchTypes} from "../../http/itemAPI";
import Pages from "../../components/Pages/Pages";
import {Box} from "@chakra-ui/react";

const Home = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        item.setSelectedBrand(null);
        item.setSelectedType(null);
        fetchTypes().then(data => item.setTypes(data))
        fetchBrands().then(data => item.setBrands(data))
        fetchDevices(null, null, 1, 8).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(item.selectedType?.id, item.selectedBrand?.id, item.page, 8).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)
        })
    }, [item.page, item.selectedType, item.selectedBrand])

    return (
        <div>
            <Navbar/>

            <Typebar>
                <ItemList/>
                <Box marginTop={'auto'} >
                    <Pages/>
                </Box>
            </Typebar>



        </div>

    );
});

export default Home;