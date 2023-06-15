import React, {useContext, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, adminRoutes} from "../../routes/routes";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {

    const {user, item} = useContext(Context);


    const isLoading = false;

    if (isLoading) {
        return <div>Loading</div>
    } else {
        return (
            user.isAuth
                ? user.user.role === 'ADMIN'
                    ?
                    <Routes>
                        {adminRoutes.map(route =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.element/>}
                            />
                        )}
                        <Route path='*'
                               element={<Navigate to="/home" replace/>}/>
                    </Routes>
                    :
                    <Routes>
                        {privateRoutes.map(route =>
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.element/>}
                            />
                        )}
                        <Route path='*'
                               element={<Navigate to="/home" replace/>}/>
                    </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.element/>}
                        />
                    )}
                    <Route path='*'
                           element={<Navigate to="/home" replace/>}/>
                </Routes>
        )
    }


});

export default AppRouter;