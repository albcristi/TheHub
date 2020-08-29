import * as React from "react";
import './MessageComponentStyle.css';

export class MessageComponent extends React.Component{
    constructor(props){
        super(props);
    }


    render() {
        const {messageID} = this.props;
        const {messageTitle} = this.props;
        const {messageBody} = this.props;
        const {bodyStyle} = this.props;
        const {headerStyle} = this.props;

        return (
            <div className={"message-container-custom"}>
                <div id={messageID} className="modal fade" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className={`modal-title ${headerStyle}`} id="exampleModalLongTitle">{messageTitle}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className={`modal-body ${bodyStyle}`}>
                                {messageBody}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}