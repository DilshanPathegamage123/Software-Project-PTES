

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LeaveRequest } from '../../interfacesReporting';
import '../BusOwnerPage3/LeaveRequestsOwnerView.css';

interface LeaveRequestsOwnerViewProps {
   id: string;
}

const LeaveRequestsOwnerView: React.FC<LeaveRequestsOwnerViewProps> = ({ id }) => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            setIsLoading(true); // Start loading
            try {
                const userId = id;
                console.log('Fetching leave requests for train owner:', userId);
                const response = await axios.get(`http://localhost:5050/api/LeaveRequests/trainowner/${userId}/leaverequests`);
                const now = new Date();
                const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today's date without time

                const requests = response.data.$values.map((request: LeaveRequest) => {
                    const endDate = new Date(request.endDate);
                    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()); // End date without time

                    // Update the status to "Cancelled" if the end date is before today
                    if (endDateOnly < nowDateOnly) {
                        request.status = 'Cancelled';
                        updateLeaveRequestStatus(request.id, 'Cancelled');
                        console.log('Request has been cancelled:', request);
                    }
                    return request;
                }).filter((request: LeaveRequest) => {
                    const endDate = new Date(request.endDate);
                    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()); // End date without time

                    // Only include cancelled requests from the last week or not cancelled requests
                    const isRecentCancelled = request.status !== 'Cancelled' || (nowDateOnly.getTime() - endDateOnly.getTime()) <= (7 * 24 * 60 * 60 * 1000);
                    return isRecentCancelled;
                });

                requests.sort((a: LeaveRequest, b: LeaveRequest) => {
                    const aStartDate = new Date(a.startDate).getTime();
                    const bStartDate = new Date(b.startDate).getTime();
                    return aStartDate - bStartDate;
                });

                setLeaveRequests(requests);
                setIsLoading(false); // Stop loading
            } catch (error) {
                console.error('There was an error fetching the leave requests!', error);
                // Swal.fire('Error', 'There was an error fetching the leave requests!', 'error');
                setIsLoading(false); // Stop loading
            }
        };

        fetchLeaveRequests();
    }, [id]);

    const updateLeaveRequestStatus = async (id: number, status: string) => {
        try {
            await axios.post(`http://localhost:5050/api/LeaveRequests/${id}/cancel`, { status });
            console.log('Leave request status updated successfully!');
        } catch (error) {
            console.error('There was an error updating the leave request status!', error);
            // Swal.fire('Error', 'There was an error updating the leave request status!', 'error');
        }
    };

    const handleView = (request: LeaveRequest) => {
        setSelectedRequest(request);
    };

    const handleClose = () => {
        setSelectedRequest(null);
    };

    const handleDecision = (id: number, decision: 'accepted' | 'rejected') => {
        if (selectedRequest?.status === 'Cancelled') {
            Swal.fire('Error', 'This request has been cancelled and cannot be accepted or rejected.', 'error');
            return;
        }

        const endpoint = decision === 'accepted' ? `http://localhost:5050/api/LeaveRequests/${id}/accept` : `http://localhost:5050/api/LeaveRequests/${id}/reject`;

        axios.post(endpoint)
            .then(response => {
                setLeaveRequests(prevRequests => prevRequests.filter(req => req.id !== id));
                Swal.fire('Success', `Leave request ${decision}`, 'success');
                handleClose();
            })
            .catch(error => {
                Swal.fire('Error', 'Something went wrong', 'error');
                console.error('There was an error making the decision!', error);
            });
    };

    return (
        <div className="container">
            <h5>Leave Requests</h5>
            {isLoading ? (
                <p>Loading...</p>
            ) : leaveRequests.length === 0 ? (
                <p>There are no requests</p>
            ) : (
                <ul className="list-group">
                    {leaveRequests.map(request => {
                        const endDate = new Date(request.endDate);
                        const now = new Date();
                        const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                        const isPast = endDateOnly < nowDateOnly; // Check if end date is in the past
                        const statusText = isPast ? 'Cancelled' : '';

                        return (
                            <li key={request.id} className={`list-group-item d-flex justify-content-between align-items-center ${isPast ? 'list-group-item-danger' : ''}`}>
                                <div>
                                    <span>{request.name}  -{request.startDate}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    {isPast && <span className="me-3 text-danger">{statusText}</span>}
                                    <button className="btn btn-primary" onClick={() => handleView(request)}>View</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {selectedRequest && (
                <div className="modal" style={{ display: 'block' }} tabIndex={-1} role="dialog">
                    <div className="model-view-owner modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Leave Request Details</h5>
                            <button className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Driver Name:</strong> {selectedRequest.name}</p>
                            <p><strong>Date:</strong> {selectedRequest.date}</p>
                            <p><strong>Start Date:</strong> {selectedRequest.startDate}</p>
                            <p><strong>End Date:</strong> {selectedRequest.endDate}</p>
                            <p><strong>Total Days:</strong> {selectedRequest.totalDays}</p>
                            <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                            <p><strong>Other Reason:</strong> {selectedRequest.otherReason}</p>
                            <p><strong>Family and Medical:</strong> {selectedRequest.familyAndMedical}</p>
                            <p><strong>Funeral Relationship:</strong> {selectedRequest.funeralRelationship}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                            <button className="btn btn-success" onClick={() => handleDecision(selectedRequest.id, 'accepted')}>Accept</button>
                            <button className="btn btn-danger" onClick={() => handleDecision(selectedRequest.id, 'rejected')}>Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveRequestsOwnerView;
