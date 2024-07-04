import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverLeaveRequest.css';
import { LeaveRequest, NewLeaveRequest } from '../interfacesReporting';
import Swal from 'sweetalert2';


interface DriverLeaveRequestProps {
    DriverId: number;
    DriverName: string;
}

const DriverLeaveRequest: React.FC<DriverLeaveRequestProps> = ({ DriverId,DriverName }) =>  {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newRequest, setNewRequest] = useState<NewLeaveRequest>({
        reason: '',
        otherReason: '',
        startDate: '',
        endDate: '',
        totalDays: 0,
        currentDate: new Date().toISOString().split('T')[0],
        familyAndMedical: '',
        funeralRelationship: '',
        termsAccepted: false,
        status:''
    });

    const handleShowTermsModal = () => setShowTermsModal(true);
    const handleCloseTermsModal = () => setShowTermsModal(false);

    const handleShowModal = () => {
        setIsUpdateMode(false);
        setSelectedRequest(null);
        setNewRequest({
            reason: '',
            otherReason: '',
            startDate: '',
            endDate: '',
            totalDays: 0,
            currentDate: new Date().toISOString().split('T')[0],
            familyAndMedical: '',
            funeralRelationship: '',
            termsAccepted: false,
            status: ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrors([]);
        setIsUpdateMode(false);
        setSelectedRequest(null);
    };

    useEffect(() => {
        // Swal.fire({
        //     title: 'Loading...',
        //     allowOutsideClick: false,
        //     didOpen: () => {
        //         Swal.showLoading();
        //     },
        // });
    
        setIsLoading(true);
    
        axios.get(`http://localhost:5050/api/LeaveRequests/user/${DriverId}`)
            .then(response => {
                const leaveRequests = response.data.$values || [];
                leaveRequests.sort((a: LeaveRequest, b: LeaveRequest) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setLeaveRequests(leaveRequests);
                setIsLoading(false);
                Swal.close();
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setLeaveRequests([]);
                    Swal.close();
                } else {
                    console.error('There was an error fetching the leave requests!', error);
                    Swal.fire('Error', 'There was an error fetching the leave requests!', 'error');
                }
                setIsLoading(false);
            });

    }, [DriverId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRequest({ ...newRequest, [name]: value });
    };

    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRequest({ ...newRequest, reason: e.target.value, otherReason: '' });
    };

    const validateForm = () => {
        const errorList: string[] = [];
    
        if (!newRequest.reason) {
            errorList.push("Please select a reason for leave.");
        }
        if (newRequest.reason === 'Other' && !newRequest.otherReason) {
            errorList.push("Please specify the other reason for leave.");
        }
        if (newRequest.reason === 'Sick - Family' && !newRequest.familyAndMedical) {
            errorList.push("Please enter details for Sick - Family leave.");
        }
        if (newRequest.reason === 'Funeral - Relationship' && !newRequest.funeralRelationship) {
            errorList.push("Please enter the relationship for Funeral leave.");
        }
        if (!newRequest.startDate) {
            errorList.push("Please select a start date.");
        }
        if (!newRequest.endDate) {
            errorList.push("Please select an end date.");
        }
    
        // Ensure the start date is today or in the future
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to the beginning of the day
    
        if (newRequest.startDate) {
            const start = new Date(newRequest.startDate);
            if (start < currentDate) {
                errorList.push("The start date should be today or a future date.");
            }
        }
    
        if (newRequest.startDate && newRequest.endDate) {
            const start = new Date(newRequest.startDate);
            const end = new Date(newRequest.endDate);
            let difference = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
    
            if (end < start) {
                errorList.push("The end date should be on or after the start date.");
            }
            if (difference < 0) {
                difference = 0;
                errorList.push(`The total number of days should be 0.`);
            } else {
                if (difference !== Number(newRequest.totalDays)) {
                    errorList.push(`The total number of days should be ${difference}.`);
                }
    
                if (difference > 45) {
                    errorList.push("The total leave duration cannot exceed 45 days. Please contact the vehicle owner for approval.");
                }
            }
        }
    
        setErrors(errorList);
        return errorList.length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validateForm()) {
            console.log('Form validation failed:', errors);
            return;
        }
    
        const requestData = { 
            ...newRequest, 
            name: DriverName, 
            userId: String(DriverId), // Ensure userId is a string
            totalDays: Number(newRequest.totalDays) // Ensure totalDays is a number
        };
    
        console.log('Request data:', requestData);
    
        const requestUrl = isUpdateMode 
            ? `http://localhost:5050/api/LeaveRequests/${selectedRequest?.id}`
            : 'http://localhost:5050/api/LeaveRequests';
    
        console.log('Request URL:', requestUrl);
    
        const requestMethod = isUpdateMode ? axios.put : axios.post;
    
        console.log('Request method:', isUpdateMode ? 'PUT' : 'POST');
    
        requestMethod(requestUrl, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('API response:', response);
    
            if (isUpdateMode) {
                const updatedRequests = leaveRequests.map(request =>
                    request.id === response.data.id ? response.data : request
                );
                setLeaveRequests(updatedRequests);
            } else {
                setLeaveRequests([...leaveRequests, response.data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            }
    
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Leave request ${isUpdateMode ? 'updated' : 'submitted'} successfully!`,
                timer: 2000,
                showConfirmButton: false
            });
            handleCloseModal();
        })
        .catch(error => {
            console.error('API error:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `There was an error ${isUpdateMode ? 'updating' : 'submitting'} your leave request. Please try again.`,
            });
        });
    };
    const handleViewRequest = (request: LeaveRequest) => {
        setSelectedRequest(request);
        setShowViewModal(true);
    };


    const handleUpdateRequest = (request: LeaveRequest) => {
        const requestDate = new Date(request.date);
        const now = new Date();
        const timeDifference = now.getTime() - requestDate.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);

        if (request.status === 'Accepted'|| request.status === 'Rejected'|| request.status === 'Cancelled') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${request.status} leave requests cannot be updated.`

            });
            return;
        }
        if (hoursDifference <= 24) {
            setSelectedRequest(request);
            setNewRequest({
                reason: request.reason,
                otherReason: request.otherReason,
                startDate: request.startDate,
                endDate: request.endDate,
                totalDays: request.totalDays,
                currentDate: request.date,
                familyAndMedical: request.familyAndMedical,
                funeralRelationship: request.funeralRelationship,
                termsAccepted: true,
                status: request.status
            });
            setIsUpdateMode(true);
            setShowModal(true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You can only update the leave request within 24 hours of submission.'
            });
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Accepted':
                return { color: 'black' };
            case 'Rejected':
                return { color: 'black' };
                case 'Cancelled':
                    return { color: 'gray' };
            default:
                return { color: 'blue' };
        }
    };

    const getStatusText = (status: string, endDate: string) => {
        if (status === 'Accepted' || status === 'Rejected'|| status === 'Cancelled') {
            return status;
        // } else if (new Date(endDate) < new Date()) {
        //     return 'Cancelled';
        } else {
            return 'Pending';
        }
    };



    return (
        <div className={`container ${showModal ? 'blur' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Leave Requests</h5>
                <button className="btn btn-primary" onClick={handleShowModal}>+</button>
            </div>
            
            {isLoading ? (
                <p>Loading...</p>

            ) :
            leaveRequests.length === 0 ? (
          <div className="row p-5 rounded-4 sec shadow bg-grey mt-5 mb-5 ml-4 mr-4">
          <div className="col-lg-12 mt-5 mb-5">
              <p className=" fs-10 fw-bold font-family-Inter">
                 No leave requests have been submitted yet.
              </p>
          </div>
      </div>
            ) : (
                <ul className="list-group">
                    {leaveRequests.map((request) => (
                        <li
                            key={request.id}
                            className={`list-group-item d-flex justify-content-between align-items-center 
                                ${request.status === 'Rejected' ? 'bg-danger-light-leaveRequest' : ''}
                                ${request.status === 'Accepted' ? 'bg-success-light-leaveRequest' : ''}
                               `}
                            >
                            <div>
                                <span>{request.reason} - {request.startDate} to {request.endDate}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="me-3" style={getStatusStyle(request.status)}>
                                    {getStatusText(request.status, request.endDate)}
                                </span>
                                <button className="btn btn-info me-2" onClick={() => handleViewRequest(request)}>View</button>
                                <button className="btn btn-warning" onClick={() => handleUpdateRequest(request)}>Update</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className="modal" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog custom-modal-dialog-leaveRequest" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isUpdateMode ? 'Update Leave Request' : 'New Leave Request'}</h5>
                                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {errors.length > 0 && (
                                        <div className="alert alert-danger">
                                            <ul>
                                                {errors.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label>Reason for Leave</label>
                                        <div className="row">
                                            {['Vacation', 'Sick - Self', 'Leave of Absence', 'Civil Leave/Jury Duty', 'Sick - Family', 'Sick - Dr. Appointment', 'Funeral - Relationship', 'Other'].map((reason) => (
                                                <div key={reason} className="col-md-6">
                                                    <input
                                                        type="radio"
                                                        name="reason"
                                                        value={reason}
                                                        checked={newRequest.reason === reason}
                                                        onChange={handleReasonChange}
                                                    />
                                                    <label>{reason}</label>
                                                    {(newRequest.reason === 'Sick - Family' && reason === 'Sick - Family') && (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="familyAndMedical"
                                                            value={newRequest.familyAndMedical}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter details"
                                                        />
                                                    )}
                                                    {(newRequest.reason === 'Funeral - Relationship' && reason === 'Funeral - Relationship') && (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="funeralRelationship"
                                                            value={newRequest.funeralRelationship}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter relationship"
                                                        />
                                                    )}
                                                    {(newRequest.reason === 'Other' && reason === 'Other') && (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="otherReason"
                                                            value={newRequest.otherReason}
                                                            onChange={handleInputChange}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="startDate">From</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="startDate"
                                                name="startDate"
                                                value={newRequest.startDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="endDate">To</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="endDate"
                                                name="endDate"
                                                value={newRequest.endDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="totalDays">Total Number of Days Requested</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="totalDays"
                                                name="totalDays"
                                                value={newRequest.totalDays}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="currentDate">Current Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="currentDate"
                                                name="currentDate"
                                                value={newRequest.currentDate}
                                                onChange={handleInputChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="margin-left-termsConditions">
                                            <span className="terms-link-leaveRequest" onClick={handleShowTermsModal}>Terms and conditions</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleCloseModal}>Close</button>
                                    <button type="submit" className="btn btn-primary">{isUpdateMode ? 'Update' : 'Submit'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && selectedRequest && (
                <div className="modal modal-center-view" tabIndex={-1}  style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog custom-modal-width-view" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">View Leave Request</h5>
                                <button type="button" className="close" aria-label="Close" onClick={() => setShowViewModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Reason for Leave:</strong> {selectedRequest.reason}</p>
                                {selectedRequest.reason === 'Other' && <p><strong>Other Reason:</strong> {selectedRequest.otherReason}</p>}
                                {selectedRequest.reason === 'Sick - Family' && <p><strong>Family and Medical Details:</strong> {selectedRequest.familyAndMedical}</p>}
                                {selectedRequest.reason === 'Funeral - Relationship' && <p><strong>Funeral Relationship:</strong> {selectedRequest.funeralRelationship}</p>}
                                <p><strong>Start Date:</strong> {selectedRequest.startDate}</p>
                                <p><strong>End Date:</strong> {selectedRequest.endDate}</p>
                                <p><strong>Total Days:</strong> {selectedRequest.totalDays}</p>
                                <p><strong>Status:</strong> {getStatusText(selectedRequest.status,selectedRequest.endDate)}</p>
                                <p><strong>Requested Date:</strong> {selectedRequest.date}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowViewModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showTermsModal && (
                <div className="modal" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog custom-modal-dialog-leaveRequest" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Terms and Conditions</h5>
                                <button type="button" className="close" aria-label="Close" onClick={handleCloseTermsModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>By submitting this leave request, you agree to the following terms and conditions:</p>
                                <ul>
                                    <li>The leave request for more than 7 days must be submitted at least 3 days in advance.</li>
                                    <li>The maximum leave duration  for the year is 45 days, consisting of 21 days of casual vacation and 24 days of holidays.</li>
                                    <li>For special requests exceeding the limit, please contact the vehicle owner privately.</li>
                                    <li>Any leave taken without approval will be considered unauthorized and may result in disciplinary action.</li>
                                </ul>
                                <p className="error-message-termsConditions">You can only update the leave form within 24 hours of submission.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCloseTermsModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverLeaveRequest;
