import React, { Component } from 'react';
import Axios from 'axios';
let { Provider, Consumer } = React.createContext();

export default class Query extends Component {
    state = {
        error: null,
        data: null,
        loading: true
    }

    get = (route) => {
       
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
    callApi = (data) => {
        this.setState({
            error: null,
            data: null,
            loading: true
        })
        const { method, route, run } = this.props;
        if(method=="GET" || method=="get"){
            return this.get(route);
        }
        return Axios(`${route}`, {
            method: method,
            data: data?data:this.props.data
        })
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    error: null,
                    data: data,
                    loading: false
                })
            })
            .catch((error) => {
                debugger
                this.setState({
                    error: error,
                    data: null,
                    loading: false
                })
            });
    }
    componentWillMount() {
        const { method, route, run } = this.props;
        if (method == "GET" && run) {
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
