import React from 'react';
import './infoBox.css';

import { 
  Card ,
  CardContent ,
  Typography
} from "@material-ui/core" ;

function InfoBox({title , cases , total}) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <Typography className="infoBox__total" color="textSecondary">
        Total : {total} 
        </Typography>


        <h2 className="infoBox__cases"><span className='infoBox__today'>today : </span>{cases}</h2>
        

      </CardContent>
    </Card>
  )
}

export default InfoBox ;
