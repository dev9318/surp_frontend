import moment from 'moment';
import {ColumnFilter} from './ColumnFilter'

export const COLUMNS = [
       {  
       Header: 'Date',  
       accessor: d => {
              return moment(d.updated_at)
                     .local()
                     .format("DD-MM-YYYY")
                     } ,
       Filter: ColumnFilter
       },
       {  
       Header: 'Type',  
       accessor: 'Type',
       Filter: ColumnFilter
       },
       {  
       Header: 'Location',  
       accessor: 'Location',
       Filter: ColumnFilter
       },
       {  
       Header: 'Company',  
       accessor: 'Company',
       Filter: ColumnFilter  
       },
       {  
       Header: 'Deaths',  
       accessor: 'Deaths',
       Filter: ColumnFilter,
       disableFilters:true 
       },
       {  
       Header: 'Injured',  
       accessor: 'Injured',
       Filter: ColumnFilter,
       disableFilters:true
       },
       {  
       Header: 'Source',  
       accessor: 'Source',
       Filter:ColumnFilter,
       disableSortBy: true,
       disableFilters:true
       }
]     