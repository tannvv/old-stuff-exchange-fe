import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import RootContext from './context/RootContext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import RoleBasedGuard from './guards/RoleBasedGuard';

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
                                        <RoleBasedGuard accessibleRole={[...(route.accessibleRole ?? [])]}>
                                            <Layout className={className}>
                                                <Page />
                                            </Layout>
                                        </RoleBasedGuard>
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
