import React, { Component } from 'react';
import { CountryList } from './Components/Card-List/CountryList';
import { SearchBox } from './Components/Search-box/Search-Box';
import { NavBarCard }from './Components/NavBar/NavBarCard';

import './Countries.styles.css';


class Countries extends Component {
    constructor() {
        super();
        this.state = {
            countries:[],
            searchField:"",
            regionField:"",
            darkMode: false
        }
        this.setDarkMode = this.setDarkMode.bind(this);
        this.handleRegion = this.handleRegion.bind(this);
    };


    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(all =>  this.setState({ countries: all,
            regions: all}))
    }
    setDarkMode(e){
        this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
    }

    handleRegion(e){
        this.setState({regionField: e.target.value})
    }
    render() {
        const { countries, searchField, regionField, darkMode } = this.state;
        const filterCountries = countries.filter((country) => country.name.toLowerCase().includes(searchField.toLowerCase()) &&
         country.region.toLowerCase().includes(regionField.toLowerCase()));
        
         return(
           
                <div className={darkMode ? "dark-mode" : "light-mode" }>
                    
                     <NavBarCard handlechange={this.setDarkMode} moonMode={darkMode ? "moon fas fa-moon" : "moon far fa-moon"} darkMode={darkMode ? "dark-mode" : "light-mode"}/>


                    <div className="Input">

                        < SearchBox type="search" placeholder="Search a Country" handlechange={e=> this.setState({
                            searchField: e.target.value })}
                            />
                            <select onChange={this.handleRegion} value={regionField}>
                                {countries.map(region => (
                                <option key={region.alpha2Code}>
                                    {region.region}
                                </option>
                                ))}
                            </select>

                            {/* < SearchBox type="regions" placeholder="Filter by Regions" handlechange={e=> this.setState({
                                regionField: e.target.value })}
                                /> */}

                            {/* <select onChange={this.handleRegion} value={regionField}>
                                {new Set(countries.map(country=>country.region)).map(uniqueRegion=> 
                                <option>{uniqueRegion}</option>)}
                            </select> */}
                    </div>
                    <CountryList countries={filterCountries} />

                </div>
                
        )
    }
}

export default Countries
