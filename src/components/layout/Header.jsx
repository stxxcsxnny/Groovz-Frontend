import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, useState, lazy } from 'react'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';





const Searchdialog = lazy(() => import('../specific/Searchdialog'));
const NewGroupdialog = lazy(() => import('../specific/NewGroupdialog'));
const NotificationDialog = lazy(() => import('../specific/NotificationDialog'));




const Header = () => {

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const handleamobile = () => {
        setIsMobile(prev => !prev);
    }
    const opensearchDialogue = () => {
        setIsSearch(prev => !prev);
    }
    const opennewgroup = () => {
        setIsNewGroup(prev => !prev);
    }

    const openNotification = () => {
        setIsNotification(prev => !prev);
    }

    const NevigatetoGroup = () => navigate('/groups');

    const Logouthandler = () => {
        console.log('clicked');
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, border: '0.5px solid grey' }}  >
                <AppBar position='static' sx={{ bgcolor: 'black', }} style={{




                }}>


                    <Toolbar>
                        <Typography fontWeight={"900"} fontFamily={"moo lah lah"} variant='h4'>Groovz</Typography>

                        <Box sx={{
                            display: { xs: 'block', sm: 'none' }
                        }}>
                            <IconButton color='inherit ' onClick={handleamobile}>

                                <MenuIcon sx={{ color: 'white' }} />

                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box >
                            <Tooltip title='Search'>
                                <IconButton color='inherit ' size='large' onClick={opensearchDialogue}>
                                    <SearchIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='New Group'>
                                <IconButton color='inherit ' size='large' onClick={opennewgroup}>
                                    <AddIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Manage Group'>
                                <IconButton color='inherit ' size='large' onClick={NevigatetoGroup}>
                                    <GroupIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Notification'>
                                <IconButton color='inherit ' size='large' onClick={openNotification}>
                                    <Notifications sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>



                            <Tooltip title='Logout'>
                                <IconButton color='inherit ' size='large' onClick={Logouthandler}>
                                    <LogoutIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>


                        </Box>
                    </Toolbar>

                </AppBar>


            </Box>
            {
                isSearch && <Suspense fallback={<div><Backdrop /></div>}><Searchdialog />
                </Suspense>

            }
            {
                isNewGroup && <Suspense fallback={<div><Backdrop /></div>}><NewGroupdialog />
                </Suspense>

            }
            {
                isNotification && <Suspense fallback={<div><Backdrop /></div>}><NotificationDialog />
                </Suspense>

            }
        </>
    )
}



export default Header