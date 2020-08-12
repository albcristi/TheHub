import * as React from "react";
import './SearchBarStyle.css';

export class SearchBarComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div>
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                        <input className="search_input" type="text" name="" placeholder="Search..."/>
                        <a href="#" className="search_icon">
                        <i className="fas fa-search"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}