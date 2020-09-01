import React , {useState, useEffect} from 'react'

import {Line} from "react-chartjs-2";

import numeral from "numeral";



function LineGraph() {

  //  *********** States :

  const  [data , setData] = useState( {} ) ;

    // ************  build Chart Data : 

    const buildChartData = ( data , casesType="cases" ) => {
      const chartData = [];
      let lastDataPoint; 
      
        for(let  date in data.cases) {
            
          if(lastDataPoint) {
            const newDataPoint = {
                x : date , 
                y : data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
          }
            lastDataPoint = data[casesType][date];

        }

        return chartData;
  }
  // ******************* useEffects :

  useEffect( () => {
     const fetchData = async () => {
       await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then( respense => respense.json() )
        .then(data => {
          // clever stuff ...
          console.log(data);
          const chartData   = buildChartData(data);
          console.log(chartData);    
          setData(chartData);   
        } ); 
     }
     
     fetchData();

  } , []);

  // *************** LineGraph returns : 

  return (
    <div >
      <h1>I am a Graph 2</h1>
      <Line 
          data = {
            {
              datasets : [
                    {
                      data : data 
                    }
              ],
            } 
          }
        />
    </div>
  )
}

export default LineGraph;


// To fix 