import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logging from './config/logging';
import routes from './config/routes';

const Application: React.FunctionComponent<{}> = props => {
    useEffect(() => {
        logging.info('Loading application.');
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.component
                                    name={route.name}
                                    {...props}
                                    {...route.props}
                                />}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>

            {/* Overlays */}
        </div>
    );
}

export default Application;