
import * as React from 'react'
import { CustomCard } from "../../../components/card/card"
import style from './clientpage.module.scss'
import moment from "moment";
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import {
    Box,
    FormControl,
    FormLabel,
    Select,
    Option,
    Typography,
    IconButton,
} from "@mui/joy";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useQuery } from "@apollo/client";
import { getAllAssetAccountsForClientQuery } from "./queries";
import { useAuth } from "../../authentication/hooks/useAuth";
import { USER_PREF_STORAGE_KEY } from "../../authentication/constants/auth";
function createData(
    username,
    phone_number,
    account_number,
    total_paid,
    unlock_price,
    status,
    created_at
) {
    return { username, phone_number, account_number, total_paid, unlock_price, status, created_at };
}

let rows = [
    createData('Dennis Ndegwa', "0795635364", "2344223", "3000", "5000", "Enabled", "2019-01-26 16:30:00"),
    createData('Mary Maina', "0732453364", "2132312", "1500", "4500", "Disabled", "2019-02-25 11:30:00"),
    createData('Ferdinand Waititu', "0767887563", "1223435", "2400", "10000", "Enabled", "2019-01-25 12:30:00"),
    createData('Mike Kimani', "0709767356", "9056554", "1700", "7000", "Enabled", "2019-05-25 13:30:00"),
    createData('Ginger Wamuyu', "0710763783", "0876454", "800", "1000", "Disabled", "2019-04-25 12:30:00"),
    createData('Mike Kimani', "0709767356", "9056554", "1700", "7000", "Enabled", "2019-05-25 13:30:00"),
    createData('Ginger Wamuyu', "0710763783", "0876454", "800", "1000", "Disabled", "2019-04-25 12:30:00"),
    createData('Mike Kimani', "0709767356", "9056554", "1700", "7000", "Enabled", "2019-05-25 13:30:00"),
    createData('Ginger Wamuyu', "0710763783", "0876454", "800", "1000", "Disabled", "2019-04-25 12:30:00"),
    createData('Mike Kimani', "0709767356", "9056554", "1700", "7000", "Enabled", "2019-05-25 13:30:00"),
    createData('Ginger Wamuyu', "0710763783", "0876454", "800", "1000", "Disabled", "2019-04-25 12:30:00"),
];

function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

export function ClientPage({ }) {
    const userId = localStorage.getItem("user_id")
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { loading, error, data } = useQuery(getAllAssetAccountsForClientQuery, {
        variables: { clientId: userId, first: 20 }
    })
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event, newValue) => {
        setRowsPerPage(parseInt(newValue.toString(), 10));
        setPage(0);
    };
    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? rows.length
            : Math.min(rows.length, (page + 1) * rowsPerPage);
    };
    if (data) {
        //     console.log(data.getAllAssetAccountsForClient?.page?.edges, "----37----")
        // rows = data.getAllAssetAccountsForClient?.page?.edges
    }

    return (
        <div style={{ display: "flex", marginTop: "2rem", justifyContent: "space-around" }}>
            <CustomCard>
                <Typography level="body-sm" textAlign="center" sx={{ mb: 2, marginTop: "1rem", color: "white" }}>
                    The table body is scrollable.
                </Typography>
                <Sheet sx={{ maxHeight: 400, overflow: 'auto', background: "#202c74" }}>

                    <Table
                        aria-label="table with sticky header"
                        stickyHeader
                        stickyFooter
                        stripe="odd"
                        hoverRow
                        sx={(theme) => ({
                            '& thead> tr > th': { bgcolor: '#202c74', color: "#bfcee3", borderBottom: '0.5px solid #546a9b' },
                            '& tbody > tr:nth-of-type(odd)': {
                                bgcolor: '#1a3576', color: "white"
                            },
                            '& tbody > tr:nth-of-type(even)': {
                                bgcolor: '#202c74',  color: "white"
                            },
                            '& tfoot> tr > td': { bgcolor: '#202c74', color: "#bfcee3", borderTop: '0.3px solid #546a9b' },
                            '& tbody tr > td': {
                                borderBottom: '0.3px solid #546a9b', // Set your desired border color
                              },
                        })}
                    >
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Account Number</th>
                                    <th>Phone Number</th>
                                    <th>Total Paid</th>
                                    <th>Unlock Price</th>
                                    <th>Status</th>
                                    <th>Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.phone_number}>
                                        <td>{row.username}</td>
                                        <td>{row.account_number}</td>
                                        <td>{row.phone_number}</td>
                                        <td>{row.total_paid}</td>
                                        <td>{row.unlock_price}</td>
                                        <td>{row.status === "Enabled" ? <Chip color="success" style={{ backgroundColor: 'green', color: "white" }} variant="solid">Enabled</Chip> : <Chip color="danger" style={{ backgroundColor: 'red', color: "white" }} variant="solid">Disabled</Chip>}</td>
                                        <td>{moment(row.created_at).format('D MMMM YYYY')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={7}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <FormControl orientation="horizontal" size="sm">
                                                <FormLabel style={{color: "white"}}>Rows per page:</FormLabel>
                                                <Select style={{backgroundColor: "rgba(255, 255, 255, 0)", border: "1px solid #546a9b", color: "white"}} onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                                                    <Option value={5}>5</Option>
                                                    <Option value={10}>10</Option>
                                                    <Option value={25}>25</Option>
                                                </Select>
                                            </FormControl>
                                            <Typography textAlign="center" sx={{ minWidth: 80 }}>
                                                {labelDisplayedRows({
                                                    from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                                    to: getLabelDisplayedRowsTo(),
                                                    count: rows.length === -1 ? -1 : rows.length,
                                                })}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    size="sm"
                                                    color="neutral"
                                                    variant="outlined"
                                                    disabled={page === 0}
                                                    onClick={() => handleChangePage(page - 1)}
                                                    sx={{ bgcolor: 'background.surface' }}
                                                >
                                                    <KeyboardArrowLeftIcon style={{ backgroundColor: "rgba(255, 255, 255, 0)"}} />
                                                </IconButton>
                                                <IconButton
                                                    size="sm"
                                                    color="neutral"
                                                    variant="outlined"
                                                    disabled={
                                                        rows.length !== -1
                                                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                                            : false
                                                    }
                                                    onClick={() => handleChangePage(page + 1)}
                                                    sx={{ bgcolor: 'background.surface' }}
                                                >
                                                    <KeyboardArrowRightIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                        {/* </div> */}
                    </Sheet>
                </CustomCard>
            </div>
    )
}

