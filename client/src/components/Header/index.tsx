import { HeaderContainer, LogoTypography } from './header.ts'
import { Box, Button, Drawer, IconButton, Tab, Tabs } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { SyntheticEvent, useState } from 'react'
import { headerTabsDataCreation } from './helpers/headerTabsDataCreation.ts'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../__redux__/slice/userSlice.ts'
import useResize from '../../customHooks/resizeHook.tsx'

export const Header = () => {
  const {pathname} = useLocation();
  const [navTabValue, setNavTabValue] = useState(pathname === '/applications' ? 'myApplications' : 'createApplications');
  const [open, setOpen] = useState(false);

  const {width} = useResize();

  const dispath = useDispatch();
  const navigate = useNavigate();

  const tabs = headerTabsDataCreation()

  const tabChangeHandler = (_event: SyntheticEvent, newValue: string) => {
    setNavTabValue(newValue)
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleExit = () => {
    dispath(clearAuth());
    navigate('/login');
  }

  const DrawerList = (
    <Box sx={{ width: 'auto', padding: '20px' }} role="presentation" onClick={toggleDrawer(false)}>
      <Tabs sx={{ alignItems: 'center' }} orientation="vertical" value={navTabValue} onChange={tabChangeHandler} color="primary">
        {tabs.map((tab) => (
          <Tab
            value={tab.value}
            key={tab.id}
            label={tab.name}
            component={tab.link ? Link : Button}
            to={tab.link ? tab.link : undefined}
            sx={{ textTransform: 'none', fontSize: '16px', color: 'black' }}
          />
        ))}
        <Tab
            value='Exit'
            key='3'
            label='Выйти'
            component={Button}
            onClick={handleExit}
            sx={{ textTransform: 'none', fontSize: '16px', color: 'black' }}
          />
      </Tabs>
    </Box>
  );

  return (
    <HeaderContainer>
      <LogoTypography>Название продукта</LogoTypography>
      {
        width <= 500 ? (
          <>
            <Button onClick={toggleDrawer(true)}>Меню</Button>
            <Drawer anchor='top' open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </>
        ) : (
          <>
            <Tabs value={navTabValue} onChange={tabChangeHandler} color="primary">
              {tabs.map((tab) => (
                <Tab
                  value={tab.value}
                  key={tab.id}
                  label={tab.name}
                  component={tab.link ? Link : Button}
                  to={tab.link ? tab.link : undefined}
                  sx={{ textTransform: 'none', fontSize: '16px', color: 'black' }}
                />
              ))}
            </Tabs>
            <IconButton onClick={handleExit}>
              <LogoutIcon color="primary" />
            </IconButton>
          </>
        )
      }
    </HeaderContainer>
  )
}
