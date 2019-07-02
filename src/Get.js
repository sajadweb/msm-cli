import React, { Component } from 'react';
import Axios from 'axios';
let { Provider, Consumer } = React.createContext();

export default class Rest extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            data: null,
            loading: true
        }
    }
   

   get(route) { 
        return Axios.get(`${route}`)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    error: null,
                    data: data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    data: null,
                    loading: false
                })
            });
    }
    callApi() {
        const { route } = this.props;
        this.setState({
            error: null,
            data: null,
            loading: true
        })
        
        return this.get(route);
        
    }
    componentWillMount() {
        const { route, run } = this.props;
        if (run) {
            this.get(route)
        } else {
            this.setState({
                error: null,
                data: null,
                loading: false
            })
        }
    }
    render() {
        const { data, loading, error } = this.state;
        const { run } = this.props;

        return (<Provider value={{ data, loading, error, callApi: run ? undefined :this.callApi  }}>
            <Consumer>
                {this.props.children}
            </Consumer>
        </Provider>)


    }
}
