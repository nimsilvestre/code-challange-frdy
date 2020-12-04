import React from "react";
import PropTypes from "prop-types";
import { ListPagination } from "./PaginationElements";

const Pagination = ({ vehiclePerPage, totalVehicles, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVehicles / vehiclePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ListPagination style={{ display: "flex", listStyle: "none" }}>
        {pageNumbers.map((number) => (
          <li style={{ paddingRight: "5px" }} key={number}>
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ListPagination>
    </nav>
  );
};

Pagination.propTypes = {
  vehiclePerPage: PropTypes.number.isRequired,
  totalVehicles: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};
export default Pagination;
