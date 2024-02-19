import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { CustomCard } from '../../components/card/card';
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
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('1', 159, 6.0, 24, 4.0),
    createData('2', 237, 9.0, 37, 4.3),
    createData('3', 262, 16.0, 24, 6.0),
    createData('4', 305, 3.7, 67, 4.3),
    createData('5', 356, 16.0, 49, 3.9),
    createData('6', 159, 6.0, 24, 4.0),
    createData('7', 237, 9.0, 37, 4.3),
    createData('8', 262, 16.0, 24, 6.0),
    createData('9', 305, 3.7, 67, 4.3),
    createData('10', 356, 16.0, 49, 3.9),
];

function sum(column) {
    return rows.reduce((acc, row) => acc + row[column], 0);
}
function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
export default function TableStickyHeader() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    return (
        <div style={{ display: "flex", marginTop: "2rem", justifyContent: "space-around" }}>
            <CustomCard>
                <Typography level="body-sm" textAlign="center" sx={{ mb: 2 }}>
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
                                <th>Row</th>
                                <th>Calories</th>
                                <th>Fat&nbsp;(g)</th>
                                <th>Carbs&nbsp;(g)</th>
                                <th>Protein&nbsp;(g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.name}>
                                    <td>{row.name}</td>
                                    <td>{row.calories}</td>
                                    <td>{row.fat}</td>
                                    <td>{row.carbs}</td>
                                    <td>{row.protein}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                                <tr>
                                    <td colSpan={5}>
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
                                                <Select style={{backgroundColor: "rgba(255, 255, 255, 0)", border: "1px solid   "}} onChange={handleChangeRowsPerPage} value={rowsPerPage}>
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
                                                    <KeyboardArrowLeftIcon />
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
                </Sheet>
            </CustomCard>
        </div>
    );
}