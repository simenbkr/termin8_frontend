/**
 * Created by Jens-Andreas on 11-Apr-17.
 */
import React from 'react';
import {Card, Button,Row,Input,Dropdown, NavItem, Icon, Badge} from 'react-materialize';


const style = {
    cardStyle: {
        position: 'absolute',
        zIndex: 2,
        width: "380px",
        height: "615px",
        left: '20px',

    },

    cancelButtonStyle: {
        waves: 'light',
        className: 'red lighten-2',
        style: {
            margin: "10px",
            position: 'absolute',
            bottom: '10px',
            right: '30px',
            width: '140px'
        }
    },

    confirmButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            margin: "10px",
            position: 'absolute',
            bottom: '10px',
            left: '30px',
            width: '140px'
        }
    },

    roomButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            margin: "0px 10px 40px 10px",
            width: "310px",
        }
    },

    typeButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            margin: "0px 10px 40px 10px",
            width: "310px"
        }
    },

    divider: {
        margin: '8px 0px 50px 0px',
        height: 1,
        backgroundColor: '#757575',
    },
};


class PlantConfigCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            plantId: props.plantProps.id,
            plantName: props.plantProps.name,
            plantRoom: props.plantProps.room,
            plantType: props.plantProps.plant_type,
            autoWater: props.plantProps.automatic_water,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAutoWaterToggle = this.handleAutoWaterToggle.bind(this);
    }


    loadDefaultForm(){
        let plantName = {
            s: 12,
            label:"Plant name",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        if(this.state.plantName != undefined)
            plantName.defaultValue = this.state.plantName;


        let plantRoom = {
            trigger: <Button {...style.roomButtonStyle}>
                    Room <Icon right>arrow_drop_down</Icon>
                    </Button>,
        }

        let plantType = {
            trigger: <Button {...style.typeButtonStyle}>Type<Icon right>arrow_drop_down</Icon></Button>
        }

        let autoWater = {
            s: 6,
            name: "on",
            type: 'switch',
            defaultChecked: this.state.autoWater,
        }


        const fieldBox = {
            style: {
                margin: "15px",
            }
        }

        return(
            <Row>
                <Input {...plantName} onChange={this.handleNameChange}/>

                <Dropdown {...plantRoom}>
                    {this.getRooms()}
                </Dropdown>

                <Dropdown {...plantType}>
                    {this.getTypes()}
                </Dropdown>

                <div {...fieldBox}>
                    <h6> Automatically water</h6>
                    <Input {...autoWater} onChange={this.handleAutoWaterToggle}/>
                </div>

            </Row>
        )

    }


    /**
     * The following section handles all handling of input from thee name field
     * Note: The binding
     */
    handleNameChange(event){
        this.state.plantName = event.target.value;
    }

    /**
     * The following section handles the generation of the room dropdown menu
     * and all related events.
     */
    getRooms(){
        const rooms = [];
        for(let i = 0; i < this.props.roomData.length; i++){
            if(this.props.roomData[i].id != this.state.plantRoom) {
                rooms.push(<NavItem
                    key={i}
                    onClick={(selectedRoom) => this.handleRoomDropdown(this.props.roomData[i].id)}
                >{this.props.roomData[i].name}</NavItem>)
            } else {
                rooms.push(<NavItem key={i}>{this.props.roomData[i].name}<Badge>Selected</Badge></NavItem>)
            }
        }
        return rooms;
    }

    handleRoomDropdown(selectedRoom){
        this.setState({
            plantRoom: selectedRoom,
        })
    }


    /**
     * The following section handles the generation of the plant types dropdown menu
     * and all related events.
     * @returns {Array}
     */
    getTypes(){
        const types = [];
        for(let i = 0; i < this.props.typeData.length; i++){
            if(this.props.typeData[i].id != this.state.plantType.id) {
                types.push(
                    <NavItem
                        key={i}
                        onClick={(selectedType)=>this.handleTypeDropdown(this.props.typeData[i])}
                    >{this.props.typeData[i].name}</NavItem>)
            } else {
                types.push(<NavItem key={i}>{this.props.typeData[i].name}<Badge>Selected</Badge></NavItem>)
            }
        }
        return types;

    }

    handleTypeDropdown(selectedType){
        this.setState({
            plantType: selectedType,
        })
    }

    /**
     * Handle the toggleing of the automatic water button.
     */
    handleAutoWaterToggle(){
        if(this.state.autoWater){
            this.setState({
                autoWater: false,
            })
        } else {
            this.setState({
                autoWater: true,
            })
        }
    }


    /**
     * Renders the HTML for the configuration card
     * @returns {XML}
     */

    render() {
        return (

            <div>
                <Card style={style.cardStyle}>
                    <h3>Configure Plant</h3>
                    <div style={style.divider}/>
                    {this.loadDefaultForm()}
                    <Button {...style.cancelButtonStyle} onClick={this.props.handleCancelButton}>Cancel</Button>
                    <Button {...style.confirmButtonStyle} onClick={(returnProps) => this.props.handleConfirmButton(this.state)}>Confirm</Button>
                </Card>

            </div>
        )
    }


};

export default PlantConfigCard;