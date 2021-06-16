import React from 'react'
import { View, Text } from 'react-native'
import {URL, URLSearchParams} from 'react-native-url-polyfill'
import {distance, bearing} from '@turf/turf'

const LocalNotice = (props) => {
    //let dist = distance(props.origin, props.target.position)
    let d = distance([props.origin.latitude,props.origin.longitude], props.target.position);
    d = Math.floor(100*d)/100
    let b = bearing([props.origin.latitude,props.origin.longitude], props.target.position)
    console.log(b)
    return <Text>{props.target.name} is located {d} km away</Text>
}

const LocalArea = (props)=>{
    let e = props.area.map((place)=>
        <LocalNotice key={place._id} target={place} origin={props.coords}/>
    )
    return e;
}
class Neighbourhood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            localarea: []
        }
    }

    getLocalArea() {
        let coords=this.props.coords
        if(!coords) return;
        let url = new URL('/api/saplings/neighbourhood', this.props.apiurl)
        url.search = new URLSearchParams({latitude: coords.latitude, longitude:coords.longitude})
        try {
            fetch(url,{
                method:'GET'
            }).then(result=>result.json()).then((data)=>{
                this.setState({localarea: data})
            })
        }
        catch(e) {}
    }

    componentDidUpdate(prevProps) {
        if(this.props==prevProps) return
        else this.getLocalArea()
    }

    render() {
        return <View>
            <Text>Nearby saplings:</Text>
            <LocalArea area={this.state.localarea} coords={this.props.coords}/>
        </View>
    }
}

export default Neighbourhood