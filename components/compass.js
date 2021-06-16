import React from 'react'
import {View, Text, Button } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import Neighbourhood from './neighbourhood'
import 'react-native-url-polyfill/auto';

const localAppURL = 'http://192.168.0.118:3000'



class Compass extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            saplings: [],
            geoAvail: false,
            coords: {}
        }

    }

    // Look up spatial location
    findCoordinates = async ()=>{
        Geolocation.getCurrentPosition((result)=>{
            // On success
            this.setState({
                coords: result.coords
            })
        }, (badresult)=>{
            // On failure
            console.log('Geolocation error')
            console.log(badresult)
        }, {
            // options
            enableHighAccuracy: true
        })
    }

    componentDidMount() {
        this.findCoordinates();
    }

    render() {
        return (
            <View>
            <Text>You are located at {this.state.coords.latitude}, {this.state.coords.longitude}</Text>
            <Neighbourhood coords={this.state.coords} apiurl={localAppURL}/>
            </View>
        )
    }
}

export default Compass