import React from 'react';
import { Line } from 'react-chartjs-2';





function Chart(props) {

    const { charters } = props
    const sortedcharters = charters.slice().sort((a, b) => b.dateCreated - a.dateCreated);
    
    const tankers = sortedcharters.filter(sortedcharter=>sortedcharter.ship.type=="Tanker");
    const bulkcarriers = sortedcharters.filter(sortedcharter=>sortedcharter.ship.type=="BulkCarrier");
    const othercargos = sortedcharters.filter(sortedcharter => sortedcharter.ship.type != "Tanker" && sortedcharter.ship.type !="BulkCarrier");
  
    console.log(tankers);
    console.log(bulkcarriers);
    console.log(othercargos);

    return (
        <div className="container">


            <Line

                // {charters.map((charter.ship.type==tanker)? =><option  key={cargo.id} value={cargo.id}  selected>{cargo.cargoType} </option>)}

                data={{

                 labels: charters.map(({ dateCreated }) => dateCreated),
                    datasets:
                     [
                        tankers && {
                         data: tankers.map((tanker) => tanker.fixedFreight),
                         label: 'Tankers',
                         backgroundColor: 'rgba(0,0,255,0.3)',
                         borderColor: '#3333ff',
                         fill: true,
                     },
                    bulkcarriers &&
                          {
                             data: bulkcarriers.map((bulkcarrier) => bulkcarrier.fixedFreight),
                             label: 'BulkCarriers',
                             borderColor: 'red',
                             backgroundColor: 'rgba(255, 0, 0, 0.5)',
                             fill: true,
                          },
                    othercargos &&
                    {
                        data: othercargos.map((othercargo) => othercargo.fixedFreight),
                        label: 'Others',
                        borderColor: 'yellow',
                        backgroundColor: 'rgba(255,255,0,0.3)',
                        fill: true,
                     },
                    ],
                }}
            />

        </div>
    )
}
export default Chart