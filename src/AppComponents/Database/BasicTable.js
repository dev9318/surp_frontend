import {COLUMNS} from './columns'
import './table.css'
import './button.css'
import React, { useState, useEffect, useCallback } from "react";
import { useTable,useGlobalFilter, useSortBy, usePagination, useFilters} from "react-table";
import { GlobalFilter } from './GlobalFilter'



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
    setGlobalFilter,
    state: { pageIndex, pageSize, sortBy, globalFilter }
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
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );


  useEffect(() => {
    // onSort({ sortBy, pageIndex, pageSize });
    fetchData({ sortBy, pageIndex, pageSize });
  }, [sortBy, fetchData, pageIndex, pageSize]);

  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                      ? <i class="fas fa-sort-down"></i>
                      : <i class=" fas fa-sort-up"></i>
                      : ""}
                  </span>
                      <div> {column.canFilter ? column.render('Filter') : null} </div>
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