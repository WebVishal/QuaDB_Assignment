import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    Button, Paper, TableContainer,
    TableHead, TableRow, TableBody, Table
} from '@mui/material'
import { Link } from 'react-router-dom'
import Summary from './Summary';

const DataFetch = () => {
    const [data, setData] = useState([])


    const userData = async () => {

        try {
            const GetData = await axios.get(`https://api.tvmaze.com/search/shows?q=all`);
            setData(GetData.data)

        } catch (error) {
            console.log(error)
        }
    }

    const dataHandel = (summary) => {
        return (
            <Summary
             dataEL={summary}
            />
        )
    }

    useEffect(() => {
        userData();

    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (

        <TableContainer component={Paper} style={{
            width: 700,
            margin: "auto",
            position: "relative", top: 10
        }}>
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="center">Image</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Genres</StyledTableCell>
                        <StyledTableCell align="center">Run-Time</StyledTableCell>
                        <StyledTableCell align="center">More-About</StyledTableCell>
                        <StyledTableCell align="center">Button</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((cur, index) => (

                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {cur.show.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div>
                                    <img src={cur.show.image.original}
                                        style={{ width: "100Px", height: "100px", borderRadius: "50%" }} />
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {cur.show.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{cur.show.genres[0]}</StyledTableCell>
                            <StyledTableCell align="center">{cur.show.averageRuntime}</StyledTableCell>
                            <StyledTableCell align="center"><a href={cur.show.url} target="_blank">Link</a></StyledTableCell>
                            <StyledTableCell align="center">
                                <Link to='/Summary' style={{ textDecoration: "none" }}>
                                    <Button variant="contained"
                                        onClick={() => { dataHandel(cur.show.summary) }}>
                                        Summary
                                    </Button>
                                </Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >




    )
}

export default DataFetch