import React from 'react';
import axios from 'axios';


export default class ReposDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            globalRepositoriesList: null,
            isLoaded: false,
        }
    }

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

    render() {
        const {globalRepositoriesList,isLoaded} = this.state;
        const globalList = isLoaded ? 
        <ul type="none" className="topTierList">
            {globalRepositoriesList.items.map(item => (
                <li className="topTierListElement"  key={item.name}>
                    Repository '{item.name}' created by owner {item.owner.login}
                </li>
            ))}
        </ul> : "loading..." ;
        return(
            <div className="topTierRepositoriesContainer">
            Top tier of repositories with highest numbers of stars
            {globalList}
        </div>
        )
    }
}
