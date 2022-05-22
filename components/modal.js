import React from 'react'

class Modal extends React.Component {

    //let closeButton = null
    constructor(props) {
        super(props)

        this.closeButton = null
    }

    closeModal() {
        this.closeButton.click()
    }

    submitModal = () => {
        alert('Submitting Modal')
        this.closeModal()
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Create Movie
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Movie</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                <button
                                    ref={(element) => this.closeButton = element}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >Close</button>
                                {
                                    this.props.hasSubmit &&
                                    <button
                                        onClick={this.submitModal}
                                        type="button"
                                        className="btn btn-primary"
                                    >Save changes</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Modal
