import React, { useState, useEffect } from 'react';
import './App.css';

import { 
  MenuItem ,
  FormControl ,
  Select,
  Card ,
  CardContent
} from "@material-ui/core" ;

import InfoBox from './components/infobox/InfoBox';
import Table from './components/table/Table';
import {sortData , prettyPrintStat} from './Helper/util';
import LineGraph from './components/Graph/LineGraph';
import Map from './components/map/map';
import "leaflet/dist/leaflet.css";




// USEEFFECT = Runs a piece of code based on a given condition  : 
    //  The code inside the USEEFFECT runs once ,
    // when the component loads and not again only if the condition [] is met .


function App() {
  
  // states are how we write varibles in react :
  const  [countries , setCountries] = useState( [] ) ;
  const  [country , setContry ] = useState("worldwide") ;
  const  [countryInfo , setContryInfo ] = useState({}) ;
  const  [TableData , setTableData ] = useState([]) ;
  const  [mapCenter , setMapCenter ] = 
          useState({ lat: 34.80746 , lng: -40.4796 }) ;
  const  [mapZoom , setMapZoom ] = useState(3) ;
  const  [mapCountries , setmapCountries ] = useState([]) ;


useEffect( ()=> {
    fetch("https://disease.sh/v3/covid-19/all")
   .then(respense => respense.json())
   .then(data => {
      setContryInfo(data);
   });

} , [] );  
  
useEffect( ()=>{
  // async -> send a requiste to the server , wait for it , do somethinf with the responce . 
  const getCountriesData = async () => {
    await fetch( "https://disease.sh/v3/covid-19/countries" )
    .then( respense => respense.json() )
    .then( data => {
       const countries = data.map( country => (
            {
              name : country.country ,
              value : country.countryInfo.iso3 
            }
       ));
       
       const  sortedData = sortData(data);
       setTableData(sortedData);
       setCountries(countries);
       setmapCountries(data);

    });

  };

  getCountriesData();

} , [] );


const onCountryChange = async e => {
   const countryCode = e.target.value ;

   //  https://disease.sh/v3/covid-19/all
  //  https://disease.sh/v3/covid-19/countries/[CPUNTRY_CODE]
  
  const url = countryCode === 'worldwide' 
        ? 'https://disease.sh/v3/covid-19/all'
        :  `https://disease.sh/v3/covid-19/countries/${countryCode}`;
   
        await fetch(url)
        .then(response => response.json() )
        .then( data => {
          setContry(countryCode);
          setContryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        });
};

  return (


    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
        <Select
         variant="outlined" 
         value={country} 
         onChange={onCountryChange}
        >
        <MenuItem value="worldwide" >worldwide</MenuItem> 
         { countries.map( (country)=>(
              <MenuItem value={country.value} >{country.name}</MenuItem>
         ) ) }

        </Select> 
        </FormControl>   
      </div>
  

      <div className="app__stats">
      <InfoBox title="Coronavirus Cases" 
               cases={prettyPrintStat(countryInfo.todayCases)} 
               total={countryInfo.cases} />
      <InfoBox title="Recovered" 
               cases={prettyPrintStat(countryInfo.todayRecovered)} 
               total={countryInfo.recovered} />
      <InfoBox title="Deaths"
               cases={prettyPrintStat(countryInfo.todayDeaths)} 
               total={countryInfo.deaths} />
      </div>

      {/* map */}
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
       <Card className="app__right">
         <CardContent>
           <h3>Live Cases by Country</h3>
           <Table countries={TableData} />
           <h3>Wordwide new cases</h3> 
            <LineGraph />
         </CardContent>
       </Card>
    </div>
  );
}
 
export default App;
