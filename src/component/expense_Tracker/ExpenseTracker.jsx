import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { ListItem, Typography, Box, List } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Scrollbars } from 'react-custom-scrollbars-2';
import bg from './bg.jpg'
import './ExpenseTracker.css'

const ExpenseTracker = () => {

    const [top, setTop] = useState(0);

    const handleUpdate = (values) => {
        const { top } = values;
        setTop(top);
    };

    const renderView = ({ style, ...props }) => {
        const trackColor = `rgb(${Math.round(255 - top * 255)}, ${Math.round(255 - top * 255)}, ${Math.round(255 - top * 255)})`;

        const viewStyle = {
            ...style,
        };

        const trackStyle = {
            backgroundColor: trackColor,
        };

        return (
            <div style={viewStyle} {...props}>
                <div className="track" style={trackStyle} />
            </div>
        );
    };

    const renderThumb = ({ style, ...props }) => {
        const thumbColor = `rgb(${Math.round(255 - top * 255)}, ${Math.round(255 - top * 255)}, ${Math.round(255 - top * 255)})`;

        const thumbStyle = {
            backgroundColor: thumbColor,
        };

        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };
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

    const balanceClassName = balance > 0 ? 'balance-positive' : 'balance-negative';
    return (
        <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', minHeight: "100vh", paddingBottom: "20px" }}>
            <Typography variant="h3" sx={{
                color: "#FFFFFF",
                textAlign: "center",
                padding:"20px 0px"
            }}>Expense Tracker App</Typography>
            <Box className="parent-child1">
                <Box className="child1-subchild1">
                    <Typography variant="h5" className='buget-heading'>Budget</Typography>
                    <form
                        onSubmit={handleSubmit(budgetFormSubmited)}
                    >
                        <input className='buget-input' {...register('budget')} type='number' placeholder='Enter Total Budget' required ></input> <br />
                        <button className='buget-btn'>Set Budget</button>
                    </form>
                </Box>
                <Box className="transection-des">
                    <Typography variant="h5" className='buget-heading'>Add Transection</Typography>
                    <form onSubmit={handleSubmit(amountFormSubmited)}>
                        <input className='add-des buget-input' {...register('description')} type='text' placeholder='Enter Expense Description' required ></input>  <br />
                        <input className='add-amount buget-input' {...register('amount')} type='number' placeholder='Enter Amount' required ></input> <br />
                        <button className='add-btn buget-btn'>Add Transection</button>
                    </form>
                </Box>
            </Box>
            <Box className="parent-child2">
                <Box>
                    <Typography>Total Budget</Typography>
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
                <Box className={balanceClassName}>
                    <Typography>Balance</Typography>
                    <Typography >
                        {balance.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            <Box className="parent-child3">
                <Typography variant="h4" className='child3-heading'>History</Typography>
                <Scrollbars className='scrollbar' style={{ height: 150 }}
                    renderView={renderView}
                    renderThumbHorizontal={renderThumb}
                    renderThumbVertical={renderThumb}
                    onUpdate={handleUpdate}
                >
                    <List sx={{
                        borderLeftColor: "#3C79F5"
                    }}>
                        {
                            mytransection.map((item, index) => {
                                return (
                                    <ListItem>
                                        <Box className="list-box">
                                            <Typography className='list-des'>{item.description} </Typography>
                                            <Typography className='list-amount'>RS: {item.amount}</Typography>
                                            <DeleteIcon className="list-btn" onClick={
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
        </div>
    )
}

export default ExpenseTracker