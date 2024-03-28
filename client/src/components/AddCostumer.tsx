import * as React from "react";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface costumer {
  name: string;
  phone: number;
  email: string;
  address: string;
}

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<costumer>();

  const mutation = useMutation(apiClient.tambahCustomer, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/home");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography>Customers Page</Typography>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", bgcolor: "white" }}>
          <Typography color="black">Customer Information</Typography>
        </Toolbar>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ bgcolor: "white" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Customer Name"
            autoFocus
            {...register("name", { required: "kolom ini harus diisi" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}{" "}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            autoFocus
            {...register("phone", { required: "kolom ini harus diisi" })}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}{" "}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            {...register("email", { required: "kolom ini harus diisi" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}{" "}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            autoFocus
            {...register("address", { required: "kolom ini harus diisi" })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
          <Box
            sx={{
              margin: "20px",
              justifyContent: "flex-end",
              display: "flex",
              gap: "20px",
            }}
          >
            <a href="/home">
              <Button
                variant="outlined"
                sx={{ bgcolor: "white", color: "black", padding: "6px 40px" }}
              >
                cancel
              </Button>
            </a>{" "}
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "red", color: "white", padding: "6px 40px" }}
            >
              Create New
            </Button>
          </Box>
        </Box>
      </AppBar>
    </Paper>
  );
}
