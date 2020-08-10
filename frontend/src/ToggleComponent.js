import * as React from "react";


class ToggleComponent extends React.Component{

    state = {
            showContent: true,
    };

    constructor(props){
        super(props);
    }

    changeDisplayProperty = () =>{
        this.setState({
            showContent: !this.state.showContent
        });
    };

    render() {
        const {children} = this.props;
        return children(
            {
                showContent: this.state.showContent,
                changeDisplayProperty: this.changeDisplayProperty

            }
        );
    }
}


export default ToggleComponent;