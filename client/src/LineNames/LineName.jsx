import { useDispatch } from "react-redux";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Modal, Form, Input } from "antd";

import MaterialReactTable from "material-react-table";
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "../apiRouts/apiRouts";

const initialValues = {
  lineName: "",
};

const LineName = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLineData, setisLineData] = useState(" ");
  const [isDataSaved, setIsDataSaved] = useState(false);

  //material table states
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [setIsRefresh] = useState(false);

  // const  lineData = useSelector((state) => state.line.Line);
  // const DepartsData = useSelector((state) => state.Departs.Departs);
  const DepartsData = [];

  const lineData = [];
  // dispatcher for redux
  const dispatch = useDispatch();

  // function for show and hide modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const handleShow = () => setShow(true);
  const handleClose = () => setIsModalOpen(false);

  // this functions add questiin in data base using redux
  const addData = async (e) => {
    console.log("addData is runningv>>>");
    const body = {
      userName: isLineData,
    };

    let res = await axios.post(`${ADD_USER}`, body);
    console.log("res>>>", res);
    // let res = await axios.post(GET_USERS, inputData);
    // if (res.data.success) {
    //   let response = await getLine(dispatch);
    //   setTableData(response.data.payload);
    //   setIsDataSaved(false);
    //   setIsRefresh((preValue) => !preValue);
    //   setisLineData(initialValues)
    // } else {
    //   setIsDataSaved(false);
    //   toast.warn("something went wrong");
    // }
  };

  // this part get data from api for front end from AdminLL store

const getDataforlIne=(async() =>{
const response=await axios.get(`${GET_USERS}`)
if(response.status===200){
  setTableData(response.data.success)
}
})
  useEffect(() => {
  getDataforlIne()
    if (lineData.length) {
      setTableData(lineData);
    }
  }, [dispatch]);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      let res = await axios.post(`${UPDATE_USER}`, values);
      exitEditingMode();

      //required to exit editing mode and close modal
      
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Are you sure you want to delete`)) {
        return;
      }
      let id = row.original.id;
      const response=await axios.post(`${DELETE_USER}` , {id})
console.log("response>>>>", response);

      //send api delete request here, then refetch or update local table data for re-render
    },
    [tableData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",

        enableEditing: false, //disable editing on this column

        size: 100,
      },

      
      {
        accessorKey: "userName",
        header: "User Name",
        size: 100,
      },
    ],
    [tableData]
  );

  return (
    <div className="w-100">
      <div className="px-2">
        {" "}
        <button
          type="button"
          className="btn-icon-text rounded-1 my-2 mx-2 btn btn-white bg-success text-white"
          onClick={showModal}
        >
          Add Line
        </button>
      </div>

      <Modal
        title="Submit Form"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        className=" dropdown-toggle-split m-auto footer-remove"
        style={{ zIndex: "100px", top: "-30px" }}
        
      >
        <div>
          <Form>
            <div className="my-2">
              <label className="my-1" htmlFor="">
                Enter Line Name{" "}
              </label>
              <Form.Item>
                <Input
                  placeholder="Enter Line"
                  name="checkpoint"
                  value={isLineData.lineName}
                  onChange={(e) => setisLineData(e.target.value)}
                ></Input>
              </Form.Item>
            </div>
            <div className="d-flex justify-content-between ">
              <button
                className=" mt-5 "
                onClick={handleClose}
                style={{ backgroundColor: "grey", border: "none" }}
              >
                Close
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#002564", border: "none" }}
                className="btn btn-primary"
                onClick={addData}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      <div className=" w-100 my-2 px-2 p-lg-2">
        <div className=" px-2">
          <>
            <div className=" tableClass ">
              <MaterialReactTable
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    muiTableHeadCellProps: {
                      align: "center",
                    },
                    size: 120,
                  },
                }}
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                renderRowActions={({ row, table }) => (
                  <Box sx={{ display: "flex", gap: "3rem" }}>
                    <Tooltip arrow placement="left" title="Edit">
                      <IconButton onClick={() => table.setEditingRow(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="right" title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteRow(row)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default LineName;

//states
