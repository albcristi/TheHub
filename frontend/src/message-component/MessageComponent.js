import * as React from "react";


export class MessageComponent extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const {messageID} = this.props;
        window.jQuery(`#${messageID}`).modal('show');
    }

    render() {
        const {messageID} = this.props;
        const {messageTitle} = this.props;
        const {messageBody} = this.props;
        return (
            <div>
                <div id={messageID} className="modal fade"tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{messageTitle}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {messageBody}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}