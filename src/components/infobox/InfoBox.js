import React from 'react';
import './infoBox.css';

import { 
  Card ,
  CardContent ,
  Typography
} from "@material-ui/core" ;

function InfoBox({title , cases , total , active , isRed , ...props}) {
  return (
    <Card onClick={props.onClick} 
          className={`infoBox  ${active && "infoBox--selected"} 
                               ${isRed && "infoBox--red" } `} >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <Typography className="infoBox__total" color="textSecondary">
        Total : {total} 
        </Typography>


        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          <span className='infoBox__today'>today : </span>
          {cases}
        </h2>
        

      </CardContent>
    </Card>
  )
}

export default InfoBox ;
