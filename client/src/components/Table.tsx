import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { TextField, Typography } from "@mui/material";

interface costumer {
  name: string;
  phone: number;
  email: string;
  address: string;
}

export default function StickyHeadTable() {
  const { data: customers } = useQuery("fetchQuery", () =>
    apiClient.fetchCostumer()
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers?.filter((customer: costumer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography>Customers Page</Typography>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", bgcolor: "white" }}>
          <Typography color="black">All Customers</Typography>
          <a href="/add-customer">
            <Button variant="contained" sx={{ bgcolor: "red", color: "white" }}>
              Add New Customer
            </Button>
          </a>
        </Toolbar>
      </AppBar>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </TableCell>
              {/* Add additional TableCells for other filter options */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: costumer) => (
                <TableRow hover key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    {/* Add action buttons or links here */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredCustomers?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
