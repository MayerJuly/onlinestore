import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button, Flex} from "@chakra-ui/react";

const Pages = observer(() => {
    const {item} = useContext(Context)
    const pageCount = Math.ceil(item.totalCount / item.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
            <Flex  margin={'40px auto'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>
                {pages.map(page =>
                    <Button
                        colorScheme={'teal'}
                        variant={item.page === page? 'solid' : "outline"}
                        key={page}
                        onClick={() => item.setPage(page)}
                    >
                        {page}
                    </Button>
                )}
            </Flex>

    );
});

export default Pages;