import moment from 'moment';

export const COLUMNS = [{  
       Header: 'Date',  
       accessor: d => {
              return moment(d.updated_at)
                .local()
                .format("DD-MM-YYYY")
            } 
       },
       {  
       Header: 'Type',  
       accessor: 'Type'  
       },
       {  
       Header: 'Location',  
       accessor: 'Location'  
       },
       {  
       Header: 'Company',  
       accessor: 'Company'  
       },
       {  
       Header: 'Deaths',  
       accessor: 'Deaths'  
       },
       {  
       Header: 'Injured',  
       accessor: 'Injured'  
       },
       {  
       Header: 'Source',  
       accessor: 'Source',
       disableSortBy: true
       }]     