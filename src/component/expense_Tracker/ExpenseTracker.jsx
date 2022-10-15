import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { Card, CardActionArea, Grid, List, ListItem, Typography } from '@mui/material';
import './style.css'
import { Box } from '@mui/system';
import { Scrollbars } from 'react-custom-scrollbars-2';


export default () => {

    // User input Data
    let { userData } = useContext(GlobalContext);
    let { register, handleSubmit } = useForm();
    function formSubmited(item) {
        userData(item)
    }

    // Balance Show
    let balance = 0.00;
    let expense = 0.00;
    let income = 0.00;
    let sign;
    const { mytransection, dltData } = useContext(GlobalContext);
    mytransection.forEach((item) => {
        if (item.amount < 0) {
            balance -= (-item.amount)
            expense -= (-item.amount)
        }
        else {
            balance += (+item.amount)
            income += (+item.amount)
        }
    })
    return (
        <div>
            <Grid container spacing={1} sx={{
                pt: "100px",
                pb: "30px",
                justifyContent: "center"
            }}>
                <Grid className='Grid1' item md={3} xs={10.7} sx={{
                    mt: "40px",
                    mb: "10px",
                    pb: "20px",
                    ml: "6px",
                    boxShadow: "2px 4px 10px gray",
                    maxHeight: "280px",
                    textAlign: "center",
                }}>
                    <Typography variant="h4" sx={{
                        mb: "20px"
                    }}>Add Transection</Typography>
                    <form onSubmit={handleSubmit(formSubmited)}>
                        <input className="neumorphic neumorphic--pressed variation2 pressed"
                            {...register('description')} type='text' placeholder='Enter your detail' required></input>  <br />
                        <input className="neumorphic neumorphic--pressed variation2 pressed" {...register('amount')} type='number' placeholder='Enter your amount' required></input> <br />
                        <button class="custom-btn btn-2">Add Transection</button>
                    </form>
                </Grid>

                <Grid item md={4} xs={11} >
                    <Card sx={{
                        minHeight: "300px",
                        pl: "10px",
                        pr: "5px",
                        boxShadow: "2px 4px 10px gray",
                    }}>
                        <Typography variant="h4" sx={{
                            textAlign: "center",
                        }}>History</Typography>
                        <Scrollbars style={{ width: 330, minHeight: 320 }}>
                            <List sx={{
                            }}>
                                {
                                    mytransection.map((item, index) => {
                                        (sign = item.amount > 0 ? "+" : "-")
                                        return (
                                            <ListItem className={item.amount > 0 ? "positive" : "negtive"} sx={{
                                                justifyContent: "space-between",
                                                mb: "5px",
                                            }}>
                                                <Box sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    width: "320px",
                                                }}>
                                                    <Typography>{item.description} </Typography>
                                                    <Typography>{sign}${Math.abs(item.amount)}</Typography>
                                                </Box>
                                                <button className='history-btn' style={{
                                                    background: "red",
                                                    color: "black",
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "none",
                                                }} onClick={
                                                    () => {
                                                        mytransection.splice(index, 1)
                                                        dltData([...mytransection])
                                                    }
                                                }>X</button>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Scrollbars>
                    </Card>
                </Grid>
                <Grid item md={3} xs={10.6} sx={{
                    boxShadow: "2px 4px 10px gray",
                    mt: "40px",
                    ml: "10px",
                    pb: "30px",
                    pt: "20px",
                    maxHeight: "280px",
                }}>
                    <Box sx={{
                        textAlign: "center",
                        mb: "30px",
                    }}>
                        <Typography variant="h4" sx={{
                            pt: "20px",
                        }}>Current Balance</Typography>
                        <Typography variant="h5" sx={{
                            pt: "20px"
                        }}>
                            $:: {
                                balance.toFixed(2)
                            }
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pl: "7px",
                        pr: "10px",
                        textAlign: "center",
                        color: "white",
                    }}>
                        <Box sx={{
                            padding: "10px",
                            borderRadius: "10px",
                            background: "#ABC9FF",
                        }}>
                            <Typography>Total Income</Typography>
                            <Typography>
                                {
                                    income.toFixed(2)
                                }
                            </Typography>
                        </Box>
                        <Box sx={{
                            background: "#FF8B8B",
                            borderRadius: "10px",
                            padding: "10px",
                        }}>
                            <Typography>Total Expense</Typography>
                            <Typography>
                                {
                                    expense.toFixed(2)
                                }
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}