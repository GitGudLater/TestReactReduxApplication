/*import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import axios from 'axios';



export default class ReposDashboard extends React.Component () {
    

    componentDidMount(){

        axios.get(`https://api.github.com/search/repositories?q=stars:>=500&sort=stars&order=desc`)
        .then(
            result => {
                this.setState(
                    {
                        globalRepositoriesList: result.data,
                        isLoaded:true
                    }
                )
            }
        );
    }
    

}*/