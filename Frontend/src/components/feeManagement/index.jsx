import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { DollarSign, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export default function FeeManagement({ studentId, onClose }) {
    const [feeData, setFeeData] = useState({
        monthlyFee: 0,
        totalPaid: 0,
        outstandingAmount: 0,
        feeStatus: 'pending',
        lastPaymentDate: null
    });
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (studentId) {
            fetchFeeSummary();
        }
    }, [studentId]);

    const fetchFeeSummary = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/student/getFeeSummary/${studentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                setFeeData(response.data.feeSummary);
            }
        } catch (err) {
            setError('Failed to fetch fee summary');
            console.error('Error fetching fee summary:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
            setError('Please enter a valid payment amount');
            return;
        }

        try {
            setError('');
            setSuccess('');
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:3000/student/recordPayment/${studentId}`, {
                amount: parseFloat(paymentAmount),
                paymentDate: paymentDate
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setSuccess('Payment recorded successfully!');
                setPaymentAmount('');
                setPaymentDate(new Date().toISOString().split('T')[0]);
                fetchFeeSummary(); // Refresh fee data
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to record payment');
            console.error('Error recording payment:', err);
        }
    };

    const updateFeeStatus = async (newStatus) => {
        try {
            setError('');
            setSuccess('');
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:3000/student/updateFeeStatus/${studentId}`, {
                feeStatus: newStatus
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setSuccess('Fee status updated successfully!');
                fetchFeeSummary(); // Refresh fee data
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update fee status');
            console.error('Error updating fee status:', err);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className={styles.statusIcon} />;
            case 'overdue':
                return <AlertCircle className={styles.statusIcon} />;
            default:
                return <Calendar className={styles.statusIcon} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return styles.paid;
            case 'overdue':
                return styles.overdue;
            default:
                return styles.pending;
        }
    };

    if (loading) {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <div className={styles.loading}>Loading fee information...</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Fee Management</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}

                <div className={styles.feeSummary}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryHeader}>
                            <DollarSign className={styles.summaryIcon} />
                            <h3>Fee Summary</h3>
                        </div>
                        <div className={styles.summaryContent}>
                            <div className={styles.summaryRow}>
                                <span>Monthly Fee:</span>
                                <span>PKR {feeData.monthlyFee}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Total Paid:</span>
                                <span>PKR {feeData.totalPaid}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Outstanding:</span>
                                <span>PKR {feeData.outstandingAmount}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Status:</span>
                                <span className={`${styles.statusBadge} ${getStatusColor(feeData.feeStatus)}`}>
                                    {getStatusIcon(feeData.feeStatus)}
                                    {feeData.feeStatus}
                                </span>
                            </div>
                            {feeData.lastPaymentDate && (
                                <div className={styles.summaryRow}>
                                    <span>Last Payment:</span>
                                    <span>{new Date(feeData.lastPaymentDate).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.paymentSection}>
                    <h3>Record Payment</h3>
                    <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="paymentAmount">Payment Amount (PKR)</label>
                            <input
                                type="number"
                                id="paymentAmount"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                min="0"
                                step="0.01"
                                required
                                placeholder="Enter payment amount"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="paymentDate">Payment Date</label>
                            <input
                                type="date"
                                id="paymentDate"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Record Payment
                        </button>
                    </form>
                </div>

                <div className={styles.statusSection}>
                    <h3>Update Fee Status</h3>
                    <div className={styles.statusButtons}>
                        <button
                            className={`${styles.statusButton} ${feeData.feeStatus === 'paid' ? styles.active : ''}`}
                            onClick={() => updateFeeStatus('paid')}
                        >
                            <CheckCircle />
                            Mark as Paid
                        </button>
                        <button
                            className={`${styles.statusButton} ${feeData.feeStatus === 'pending' ? styles.active : ''}`}
                            onClick={() => updateFeeStatus('pending')}
                        >
                            <Calendar />
                            Mark as Pending
                        </button>
                        <button
                            className={`${styles.statusButton} ${feeData.feeStatus === 'overdue' ? styles.active : ''}`}
                            onClick={() => updateFeeStatus('overdue')}
                        >
                            <AlertCircle />
                            Mark as Overdue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 