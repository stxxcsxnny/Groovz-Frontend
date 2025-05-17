import { AdminPanelSettings, Group, Message, Notifications, Person } from '@mui/icons-material'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import useErrors from '../../../hooks/hook'
import AdminLayout from '../../components/layout/AdminLayout'
import { LayoutLoader } from '../../components/layout/Loaders'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { CurveButton, SearchField, } from '../../components/styles/StyledComponents'
import { useGetDashboardStatsQuery } from '../../redux/api/api'

const Dashboard = () => {


    const { data, isLoading, error } = useGetDashboardStatsQuery();


    const { stats } = data || {};

    useErrors([{
        isError: error,
        error: error
    }])



    const Appbar = <Paper
        elevation={3}
        sx={{
            padding: '1rem',
            margin: '2rem 0',
            borderRadius: '10px',



        }}
    >
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
            <AdminPanelSettings sx={{ fontSize: '3rem' }} />
            <SearchField placeholder='search...' />
            <CurveButton >Search</CurveButton>
            <Box flexGrow={1} />
            <Typography fontSize={'.7rem'}

                sx={{ display: { xs: 'none', md: 'block' }, }}
            >
                {
                    moment().format('MMMM Do YYYY, h:mm:ss a')
                }
            </Typography>
            <Notifications />


        </Stack>
    </Paper>
    const widgets = <Stack direction={{
        xs: 'column',
        sm: 'row',
    }}
        justifyContent={'center'}
        alignItems={'center'}
        marginRight={'2rem'}
    >

        <Widget title={'Chats'} value={stats?.totalChatsCount} Icon={<Person />} />

        <Widget title={'Users'} value={stats?.userCount} Icon={<Group />} />
        <Widget title={'Messeges'} value={stats?.messageCount} Icon={<Message />} />
    </Stack>
    return isLoading ? (<LayoutLoader />) : (
        <AdminLayout sx={{ scrollbarWidth: "none" }} >
            <Container component={'main'} sx={{ scrollbarWidth: "none" }}>
                {
                    Appbar
                }

                <Stack spacing={'2rem'} flexWrap={'wrap'} direction={{ xs: 'column', lg: 'row' }} justifyContent={'center'} alignItems={{ xs: 'center', lg: 'stretch' }} backgroundColor={''} sx={{ scrollbarWidth: "none" }}>

                    <Paper
                        elevation={5}
                        sx={{
                            padding: '2rem 3.5rem',
                            borderRadius: '10px',
                            width: { xs: '100%', sm: '75%', md: '50%' },
                            backgroundColor: '#1c1c1c',
                            color: 'white',
                            maxWidth: '45rem',
                            height: '24rem',
                            margin: '1rem 0',

                        }}
                    >
                        <Typography >Last Messages</Typography>
                        {
                            <LineChart values={stats?.messageChart} />
                        }
                    </Paper>
                    <Paper
                        sx={{
                            padding: '1rem',
                            margin: 'rem 0',
                            borderRadius: '10px',
                            width: { xs: '100%', sm: '500%' },
                            backgroundColor: '#1c1c1c',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: '25rem',
                            position: 'relative',
                            height: '24rem',

                        }}


                    >
                        {
                            <DoughnutChart labels={["Single chats", "Group chats"]} values={[
                                stats?.totalChatsCount - stats?.groupCount || 0, stats?.groupCount || 0]} />
                        }


                    </Paper>



                </Stack>
                {
                    widgets
                }
            </Container>
        </AdminLayout>
    )
}
const Widget = ({ title, value, Icon }) => <Paper

    elevation={3}
    sx={{
        padding: ' 1rem',
        borderRadius: '1.5rem',
        width: '15rem',
        backgroundColor: '#1c1c1c',
        margin: '1rem ',
        height: '9rem',



    }}
>

    <Stack alignItems={'center'} spacing={'1rem'}>

        <Typography

            sx={
                {
                    color: 'white',
                    borderRadius: '50%',
                    border: '5px solid white',
                    width: '5rem',
                    height: '5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }

        >{value}</Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} sx={{ color: 'white' }}>
            {Icon}

            <Typography sx={{ color: 'white' }}>{title}</Typography>
        </Stack>
    </Stack>
</Paper>

export default Dashboard