import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar';
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './sidebar_content';
import {Card,Col,Button} from 'react-materialize';

const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    content: {
        padding: '16px',
    },
};
const App = React.createClass({
    getInitialState(){
        return {docked: false, open:false};
    },

    componentWillMount() {
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, docked: mql.matches});
    },

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    onSetOpen(open) {
        this.setState({open: open});
    },

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    },

    toggleOpen(ev) {
        this.setState({open: !this.state.open});

        if (ev) {
            ev.preventDefault();
        }
    },



    render: function() {

        const sidebar = <SidebarContent />;

        const contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
                <span> Termin8 perfect plant watering system</span>
            </span>
        );

        const sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
        };

        return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    <div style={styles.content}>
                        <Col m={6} s={12}>
                            <Card className='blue-grey darken-1' textClassName='white-text' title='Card title' actions={[
                                <div>
                                    <Button waves='light' margin ="5px">button</Button>
                                    <Button waves='light'>button</Button>
                                    <Button waves='light'>button</Button>
                                </div>
                            ]}>
                                I am a very simple card. <yay></yay>
                            </Card>
                        </Col>
                    </div>
                </MaterialTitlePanel>
            </Sidebar>
        );
    }
});

export default App;
