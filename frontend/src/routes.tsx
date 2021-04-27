import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import DatabaseForm from './pages/DatabaseForm';
import ExclusionList from './pages/ExclusionList';

const Routes: React.FC = () =>{
    return(
        <BrowserRouter>
            <Route path='/database'>
                <DatabaseForm />
            </Route>
            <Route path='/'>
                <ExclusionList />
            </Route>
        </BrowserRouter>
    )
}

export default Routes;