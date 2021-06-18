// import React, {useMemo} from 'react'
// import { useTable } from 'react-table'
import {COLUMNS} from './columns'
import './table.css'
import './button.css'
// import useFetch from '../APICall/useFetch'

// export const BasicTables = () =>  
// {

// 	const {data: data, isPending, error} =  useFetch('https://chemdbsurp.herokuapp.com/');

// 	const columns = useMemo(() => COLUMNS, [])
// 	// const data = useMemo(() => DATA, [])

// 		const tableInstance=  useTable
// 		({

// 			columns,
// 			data
// 		})


// 		const { 
// 			getTableProps,
// 			getTableBodyProps,
// 			headerGroups, 
// 			rows,prepareRow
// 			} = tableInstance

// return(
// 	<div className='home'>
// 		{isPending && <div> Loading...</div>}
// 	{data &&   <table{...getTableProps()}>

//    	<thead>
//    		{headerGroups.map((headerGroup) => (
//    			<tr{...headerGroup.getHeaderGroupProps()}>
//    				{headerGroup.headers.map((column) => (
//    					<th {...column.getHeaderProps()}>{column.render('Header')}</th>
//    				))}	   			
//    			</tr>
//    		))}

//    	</thead>
//    	<tbody{...getTableBodyProps()}>
//    		{
//    			rows.map(row => {
//    				prepareRow(row)
//    				return(
//    					<tr {...row.getRowProps()}>
//    						{row.cells.map((cell) => {
//    							return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//    						})}
//    					</tr>
//    				)
//    			})
//    		}
   		
//    	</tbody>

//    </table>}
// 	</div>

// 	)

// }
// export default BasicTables;


// import React from 'react'
// import styled from 'styled-components'
// import { useTable, usePagination } from 'react-table'

// // import makeData from './makeData'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
// function Table({
//   columns,
//   data,
//   fetchData,
//   loading,
//   pageCount: controlledPageCount,
//   error:error
// }) {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     // Get the state from the instance
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//       manualPagination: true,
//       pageCount: controlledPageCount,
//     },
//     usePagination
//   )

//   // Listen for changes in pagination and use the state to fetch our new data
//   React.useEffect(() => {
//     fetchData({ pageIndex, pageSize })
//   }, [fetchData, pageIndex, pageSize])

//   // Render the UI for your table
//   return (
//     <>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>
//                   {column.render('Header')}
//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? ' 🔽'
//                         : ' 🔼'
//                       : ''}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row)
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )
//           })}
//           <tr>
//             {loading ? (
//               // Use our custom loading state to show a loading indicator
//               <td colSpan="10000">Loading...</td>
//             ) : (
//               <td colSpan="10000">
//                 Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
//                 results
//               </td>
//             )}
//           </tr>
//         </tbody>
//       </table>
//       {/* 
//         Pagination can be built however you'd like. 
//         This is just a very basic UI implementation:
//       */}
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </button>{' '}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </button>{' '}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </button>{' '}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </button>{' '}
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <span>
//           | Go to page:{' '}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               gotoPage(page)
//             }}
//             style={{ width: '100px' }}
//           />
//         </span>{' '}
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   )
// }

// // Let's simulate a large dataset on the server (outside of our component)

// function BasicTable() {
//   const columns = React.useMemo(
//     () => COLUMNS, []
//   )

//   // We'll start our table without any data
//   const [data, setData] = React.useState([])
//   const [loading, setLoading] = React.useState(false)
//   const [pageCount, setPageCount] = React.useState(0)
//   const [error, setError] = React.useState(null)
//   const fetchIdRef = React.useRef(0)

//   const fetchData = React.useCallback(({ pageSize, pageIndex}) => {

//     const fetchId = ++fetchIdRef.current

//     setLoading(true)

//     if (fetchId === fetchIdRef.current) {
//         const limit = pageSize
//         const offset = (pageIndex)*pageSize
		
// 		fetch('https://chemdbsurp.herokuapp.com/'+`?limit=${limit}&offset=${offset}`)
// 			.then(res => {
// 				if (!res.ok) {
// 				throw Error('could not fetch the data for that resource');
// 				} 
// 				return res.json();
// 			})
// 			.then(data => {
// 				setData(data.data);
// 				setError(null);
// 				setPageCount(Math.ceil(data.count/ pageSize))
// 				setLoading(false)
// 			})
// 			.catch(err => {
// 				// auto catches network / connection error
// 			if (err.name === 'AbortError'){
// 				console.log("Fetch Aborted");
// 			}
// 			else{
// 				setError(err.message);
// 				setLoading(false)
// 			}
// 			})
        
//       }
	
//   }, [])

//   return (
//     <Styles>
//       <Table
//         columns={columns}
//         data={data}
//         fetchData={fetchData}
//         loading={loading}
//         pageCount={pageCount}
// 		error={error}
//       />
//     </Styles>
//   )
// }

// export default BasicTable



import React, { useState, useEffect, useCallback } from "react";
import { useTable, useSortBy, usePagination } from "react-table";



function Table({
  columns,
  data,
  onSort,
  fetchData,
  loading,
  pageCount: controlledPageCount
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy }
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount: controlledPageCount
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    // onSort({ sortBy, pageIndex, pageSize });
    fetchData({ sortBy, pageIndex, pageSize });
  }, [sortBy, fetchData, pageIndex, pageSize]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(controlledPageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function BasicTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  const sortIdRef = React.useRef(0);
  const [error, setError] = React.useState(null)


  const columns = React.useMemo(
        () => COLUMNS, []
      )

  

  const fetchData = useCallback(({ sortBy, pageIndex, pageSize }) => {
    // Give this sort an ID
    const sortId = ++sortIdRef.current;
    // Set the loading state
    setLoading(true);
    
    if (sortId === sortIdRef.current) {
      const limit = pageSize
      const offset = (pageIndex)*pageSize
      if(sortBy.length){
        var opt = `?limit=${limit}&offset=${offset}
        &sortBy=${sortBy[0].id}&sortType=${sortBy[0].desc?-1:1}`;
      }
      else{
        var opt =`?limit=${limit}&offset=${offset}`;
      }
    fetch('https://chemdbsurp.herokuapp.com/'+opt)
      .then(res => {
        if (!res.ok) {
        throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setData(data.data);
        setError(null);
        setPageCount(Math.ceil(data.count/ pageSize))
        setLoading(false)
      })
      .catch(err => {
        // auto catches network / connection error
      if (err.name === 'AbortError'){
        console.log("Fetch Aborted");
      }
      else{
        setError(err.message);
        setLoading(false)
      }
      })
      
    }
    
  }, []);

  return (
    <Table
      columns={columns}
      data={data}
      // onSort={handleSort}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
    />
  );
}

export default BasicTable