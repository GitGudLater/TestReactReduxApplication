import React from 'react';
import axios from 'axios';


export default class ReposDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            globalRepositoriesList: null,
            isLoaded: false,
            page: 1
        }
        this.incrementPageFunction = this.incrementPageFunction.bind(this);
        this.decrementPageFunction = this.decrementPageFunction.bind(this);
        this.callReposPage = this.callReposPage.bind(this);
    }

    componentDidMount(){

        axios.get(`https://api.github.com/search/repositories?q=stars:>=500&sort=stars&order=desc&per_page=5&page=1`)
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

    callReposPage() {
        const {page} = this.state;
        axios.get(`https://api.github.com/search/repositories?q=stars:>=500&sort=stars&order=desc&per_page=5&page=${page}`)
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

    incrementPageFunction(e){
        e.preventDefault();
        const currentPage = this.state.page;
        this.setState({page: currentPage+1});
        this.callReposPage();
    }

    decrementPageFunction(e){
        e.preventDefault();
        const currentPage = this.state.page;
        this.setState({page: currentPage-1});
        this.callReposPage();
    }

    render() {
        const {globalRepositoriesList,isLoaded,page} = this.state;
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
                <button style={{display: page > 1 ? "inline" : "none" }} className="previousPageBtn" onClick={(event) => this.decrementPageFunction(event)}>Previous page</button>
                <button style={{display: globalList == [] ? "none" : "inline" }} className="nextPageBtn" onClick={(event) =>this.incrementPageFunction(event)}>Next page</button>
                {globalList}
            </div>
        )
    }
}
