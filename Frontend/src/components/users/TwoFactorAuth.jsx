import { useRef, useState } from 'react';

export default function TwoFactorAuth({ onSubmit, onResend, loading, error }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const inputs = useRef([]);

  // Handle input change
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[val.length - 1];
    setOtp(newOtp);
    if (idx < 5 && val) {
      inputs.current[idx + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      const newOtp = [...otp];
      newOtp[idx - 1] = '';
      setOtp(newOtp);
      inputs.current[idx - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      setTimeout(() => inputs.current[5].focus(), 0);
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length === 6) {
      onSubmit(otp.join(''));
    }
  };

  // Handle resend
  const handleResend = () => {
    if (resendTimer === 0 && onResend) {
      onResend();
      setResendTimer(30);
      const interval = setInterval(() => {
        setResendTimer(t => {
          if (t <= 1) { clearInterval(interval); return 0; }
          return t - 1;
        });
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 340, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Two-Factor Authentication</h2>
      <p>Enter the 6-digit code sent to your device</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '1.5rem 0' }}>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            ref={el => inputs.current[idx] = el}
            style={{
              width: 40,
              height: 48,
              fontSize: 28,
              textAlign: 'center',
              border: '2px solid #4f8cff',
              borderRadius: 8,
              outline: 'none',
              background: '#f8fafc',
              boxShadow: '0 1px 6px 0 rgba(79,140,255,0.07)'
            }}
            autoFocus={idx === 0}
          />
        ))}
      </div>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <button
        type="submit"
        disabled={otp.join('').length !== 6 || loading}
        style={{
          padding: '0.7rem 2.2rem',
          fontSize: 18,
          borderRadius: 8,
          background: '#4f8cff',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          cursor: otp.join('').length === 6 && !loading ? 'pointer' : 'not-allowed',
          marginBottom: 16
        }}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      <div style={{ marginTop: 10 }}>
        <button
          type="button"
          onClick={handleResend}
          disabled={resendTimer > 0}
          style={{
            background: 'none',
            border: 'none',
            color: '#2353b6',
            textDecoration: 'underline',
            cursor: resendTimer === 0 ? 'pointer' : 'not-allowed',
            fontSize: 16
          }}
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
        </button>
      </div>
    </form>
  );
} 