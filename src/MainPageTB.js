import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import dbx from './dropbox.js';
import './MainPageTB.css';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class MainPageTB extends Component {

    // // Testing purposes. Attach this to a button's onClick to see in action - it opens a file attached to the collection, in dropbox.
    // onBioDocumentClick = function(documentName) {
    //     this.props.dropbox.openFile(documentName);
    // };

    render() {
        const classes = this.props.classes;
        let contrib = this.props.contributions;
        return (
            <div className={" MainPage-format"}>
                <Button variant="outlined" color={"primary"} className={classes.button}>Add Contribution </Button>
                <List component="nav">

                    {contrib.map((e) => {
                        return (
                            <ListItem key={e.id || e.name}>
                                <ListItemText primary={e.name}/>
                                <Button variant="outlined" color={"primary"} className={classes.button}>Edit </Button>
                                <Button variant="outlined" color={"primary"} className={classes.button}>Preview </Button>
                                <ListItemText primary={e.status}/>
                            </ListItem>);
                    })}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(MainPageTB);