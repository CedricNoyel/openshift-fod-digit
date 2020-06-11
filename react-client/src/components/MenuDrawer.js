import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from './../views/HomePage';
import TestPage from './../views/TestPage';
import HelpPage from './../views/HelpPage';
import ErrorPage from '../views/ErrorPage';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  toolbarLogo: {
    textAlign: "center",
    horizontalAlign: "center",
    verticalAlign: "center",
    width: "160px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuLinkStyle: {
      color: 'inherit', 
      textDecoration: 'inherit',
  },
}));

export default function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <img className={classes.toolbarLogo} src="./AIRBUS_Blue.png" alt="airbus logo" align="center" draggable="false"/>
      </div>
      <div>
        <Divider />
        <List>
          <Link to="/" className={classes.menuLinkStyle}>
              <ListItem button key="Accueil">
              <ListItemIcon><HomeIcon /> </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItem>
          </Link>
          <Link to="/test" className={classes.menuLinkStyle}>
            <ListItem button key="Test page">
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary="Test page" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/help" className={classes.menuLinkStyle}>
              <ListItem button key="Aide">
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Aide" />
              </ListItem>
          </Link>
        </List>
      </div>
    </>
  );

  return (
    <Router>
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Responsive Application
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/test" component={TestPage} />
              <Route exact path="/help" component={HelpPage} />
              <Route component={ErrorPage} />
            </Switch>
        </main>
    </div>
    </Router>
  );
}

ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
