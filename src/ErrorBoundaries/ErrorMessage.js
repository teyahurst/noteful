import React from 'react'
import PropTypes from 'prop-types';

class ErrorMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error){
        return { hasError: true };
    }

    render() {
        if(this.state.hasError){
            return(
                <h2>Something went wrong, please try again later.</h2>
            )
        }
        return this.props.children;
    }
}

ErrorMessage.propTypes = {
    hasError: PropTypes.bool
}

export default ErrorMessage;