import React from 'react'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { ListItem, Typography, Box, List } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseTracker1 = () => {
    // User input Data
    let { budgetData, expenseData } = useContext(GlobalContext);
    let { register, handleSubmit, reset } = useForm();
    function budgetFormSubmited(item) {
        budgetData(item)
        reset()
    }

    function amountFormSubmited(item) {
        expenseData(item)
        reset()
    }

    // Balance Show
    let budget = 0.00;
    let expense = 0.00;
    let balance = 0.00;
    let sign;
    const { mytransection, dltData, myBudget } = useContext(GlobalContext);
    mytransection.forEach((item) => {
        if (item.amount > 0) {
            expense += (+item.amount)
        }
    })
    myBudget.forEach((item) => {
        if (item.budget > 0) {
            budget = (+item.budget)
            balance = (budget - expense)
        }
    })
    return (
        <>
            <Box sx={{
                background: "#F5F5F5",
                padding: "20px"
            }}>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                }}>
                    <Box sx={{
                        width: "350px",
                        background: "white",
                        padding: "20px",
                        borderRadius: "5px"
                    }}>
                        <Typography variant="h5">Budget</Typography>
                        <form
                            onSubmit={handleSubmit(budgetFormSubmited)}
                        >
                            <input {...register('budget')} type='number' placeholder='Enter your Budget' required style={{
                                width: "100%",
                                height: "35px",
                                margin: "10px 0px 10px 0px",
                                borderRadius: "5px",
                            }}></input> <br />
                            <button style={{
                                width: "200px",
                                height: "35px",
                                background: "#3C79F5",
                                borderRadius: "5px",
                                border: "none",
                                color: "white"
                            }}>Set Budget</button>
                        </form>
                    </Box>
                    <Box sx={{
                        width: "350px",
                        background: "white",
                        padding: "20px",
                        borderRadius: "5px"
                    }}>
                        <Typography variant="h5">Add Transection</Typography>
                        <form onSubmit={handleSubmit(amountFormSubmited)}>
                            <input {...register('description')} type='text' placeholder='Enter your detail' required style={{
                                width: "100%",
                                height: "35px",
                                margin: "10px 0px 10px 0px",
                                borderRadius: "5px",
                            }}></input>  <br />
                            <input {...register('amount')} type='number' placeholder='Enter your amount' required style={{
                                width: "100%",
                                height: "35px",
                                margin: "10px 0px 10px 0px",
                                borderRadius: "5px",
                            }}></input> <br />
                            <button style={{
                                width: "200px",
                                height: "35px",
                                background: "#3C79F5",
                                borderRadius: "5px",
                                border: "none",
                                color: "white"
                            }}>Add Transection</button>
                        </form>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        background: "#3C79F5",
                        height: "100px",
                        alignItems: "center",
                        color: "white",
                        textAlign: "center",
                        marginTop: "20px",
                        borderRadius: "5px",
                    }}>
                    <Box>
                        <Typography>TotalBudget</Typography>
                        <Typography>
                            $: {
                                budget.toFixed(2)
                            }
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>Expense</Typography>
                        <Typography>
                            {
                                expense.toFixed(2)
                            }
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>Balance</Typography>
                        <Typography>
                            {
                                balance.toFixed(2)
                            }
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    marginTop: "20px",
                    background: "white",
                    borderRadius: "5px",
                    height: "190px",
                    paddingBottom: "5px"
                }}>
                    <Typography variant="h4" sx={{
                        textAlign: "center",
                    }}>History</Typography>
                    <Scrollbars style={{ height: 150 }}>
                        <List sx={{
                            borderLeftColor: "#3C79F5"
                        }}>
                            {
                                mytransection.map((item, index) => {
                                    return (
                                        <ListItem>
                                            <Box sx={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                width: "100%",
                                            }}>
                                                <Typography sx={{
                                                    borderLeft: "4px solid #3C79F5",
                                                    paddingLeft: "15px"
                                                }}>{item.description} </Typography>
                                                <Typography>{sign}${Math.abs(item.amount)}</Typography>
                                                <EditIcon style={{
                                                    color: "#3C79F5",
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "none",
                                                }} />
                                                <DeleteIcon style={{
                                                    color: "#3C79F5",
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "none",
                                                }} onClick={
                                                    () => {
                                                        mytransection.splice(index, 1)
                                                        dltData([...mytransection])
                                                    }
                                                } />
                                            </Box>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Scrollbars>
                </Box>
            </Box>
        </>
    )
}

export default ExpenseTracker1