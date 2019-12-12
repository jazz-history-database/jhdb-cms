import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';


import fb from './firebase';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c51162',
        },
    },
});

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        marginLeft: '10px'
    },
    adminFab: {
      position: 'fixed',
        right: '2vw',
        bottom: '2vw',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    contributionList: {
        display: 'block',
        width: 'wrap',
        align: 'center',
    },
    contributionListName: {
        width: '20vw',
        textAlign: 'right',
        marginLeft: 'auto',
        paddingRight: '3vw'
    },
    contributionListStatus: {
        width: '7vw',
        textAlign: 'left',
        paddingLeft: '3vw',
        marginRight: 'auto'
    },
    cardColor: {
        backgroundColor: '#fce4ec',
    }
});

class MainPageTB extends Component {
    
    handleAddButtonClick() {
        let contribName = window.prompt("Enter collection name:");
        if(contribName) {
            fb.base.addToCollection(`Contributions`, {
                name: contribName,
                description: '',
                type: 'collection',
                imagesSubpage: false,
                videoSubpage: false,
                audioSubpage: false,
                status: 'unpublished',
            });
        } else {
            window.alert("Collection name can not be blank!");
        }
    };
  
    handleEditButtonClick(selectedContribution) {
        this.props.windowSwap(selectedContribution);
    };

    handleAdminButtonClick(){
        this.props.adminSwap();
    };
    render() {
        const classes = this.props.classes;
        const contrib = this.props.contributions;

        let adminButton = this.props.adminButton ? (
            <Fab color="primary" aria-label="Admin" className={classes.fab + " " + classes.adminFab} onClick={() => {return this.handleAdminButtonClick.bind(this)()}}>
                <SettingsIcon />
            </Fab>
        ) : (<div />);

        return (
            <MuiThemeProvider theme={theme}>
                <br/>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                    <div className={" MainPage-format"}>
                        <h1>My Contributions</h1>
                        <Button onClick={() => {return this.handleAddButtonClick.bind(this)()}} variant="outlined" color={"primary"}
                                className={classes.button}>Add Contribution </Button>
                        <List className={classes.contributionList}>
                            {contrib.map((e) => {
                                return (
                                    <ListItem key={e.id || e.name} className={classes.contributionListItem}>
                                        <h3 className={classes.contributionListName}>{e.name}</h3>
                                        <Button variant="outlined" color={"primary"}
                                                onClick={() => {return this.handleEditButtonClick.bind(this)(e)}}
                                                className={classes.button}>Edit </Button>
                                        <Button variant="outlined" color={"primary"}
                                                href={"/"+e.name.toLowerCase().replace(/ /g, "-")}
                                                className={classes.button}>Preview </Button>
                                        <h3 className={classes.contributionListStatus}>{/*e.status*/}</h3>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                </Paper>
                {adminButton}
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(MainPageTB);