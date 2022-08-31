import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import RootContext from './context/RootContext';
import Loading from './components/Loading';

function App() {
    return (
        <BrowserRouter>
            <RootContext>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout: React.FC<any> = DefaultLayout;
                            const className = route.className;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout className={className}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </RootContext>
        </BrowserRouter>
    );
}

export default App;
