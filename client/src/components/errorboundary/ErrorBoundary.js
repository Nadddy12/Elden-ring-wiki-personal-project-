import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError : false };
    
    static getDerivedStateFromError(error) {
        return { hasError : true };
    }
    
    componentDidCatch(error , info) {
        console.log(error , info);
    }
    
    componentWillUnmount() {
        window.removeEventListener("popstate" , this.handlePopState);
        this.setState({ hasError : false });
    }
    
    componentDidMount() {
        window.addEventListener("popstate" , this.handlePopState);
    }
    
    handlePopState = () => {
        window.location.reload();
    }
    
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;