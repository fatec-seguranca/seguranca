import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import DatabaseForm from './pages/DatabaseForm';
import ExclusionList from './pages/ExclusionList';

const Routes: React.FC = () =>{
    return(
        <BrowserRouter>
            <Route path='/database' exact>
                <DatabaseForm />
            </Route>
            <Route path='/' exact>
                <ExclusionList />
            </Route>
        </BrowserRouter>
    )
}

export default Routes;