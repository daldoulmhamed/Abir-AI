import React, { useState, useEffect } from 'react';
import styles from './UserIdentityForm.module.css';
import { getUserId, getFullName, setFullName, isFullNameLocked, lockFullName, getEmail, setEmail } from '../utils/userIdentity';

interface UserIdentityFormProps {
  onValidated?: (userId: string, fullName: string, email?: string) => void;
}

const UserIdentityForm: React.FC<UserIdentityFormProps> = ({ onValidated }) => {
  const [fullName, setFullNameState] = useState('');
  const [email, setEmailState] = useState('');

  useEffect(() => {
    const name = getFullName() || '';
    setFullNameState(name);
    setEmailState(getEmail() || '');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setFullName(fullName);
    setEmail(email);
    if (onValidated) onValidated(getUserId(), fullName, email);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Identity Confirmation</h2>
      <p className={styles.explanation}>Please confirm your full name (required) and email (optional).</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.label}>
            Full Name <span className={styles.required}>*</span>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullNameState(e.target.value)}
              required
              className={styles.input}
              autoComplete="name"
            />
          </label>
          <label className={styles.label}>
            Email (optional)
            <input
              type="email"
              value={email}
              onChange={e => setEmailState(e.target.value)}
              className={styles.input}
              autoComplete="email"
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>Confirm Identity</button>
      </form>
    </div>
  );
};

export default UserIdentityForm;
