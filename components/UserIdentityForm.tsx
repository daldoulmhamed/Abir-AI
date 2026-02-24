import React, { useState, useEffect } from 'react';
import styles from './UserIdentityForm.module.css';
import { getUserId, getFullName, setFullName, isFullNameLocked, lockFullName, getEmail, setEmail } from '../utils/userIdentity';

interface UserIdentityFormProps {
  onValidated?: (userId: string, fullName: string, email?: string) => void;
}

const UserIdentityForm: React.FC<UserIdentityFormProps> = ({ onValidated }) => {
  const [fullName, setFullNameState] = useState('');
  const [email, setEmailState] = useState('');
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const name = getFullName() || '';
    setFullNameState(name);
    setEmailState(getEmail() || '');
    // Si nom spécial, jamais verrouillé
    const specialNames = ['dal admin abir'];
    setLocked(isFullNameLocked() && !specialNames.includes(name.toLowerCase()));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setFullName(fullName);
    setEmail(email);
    lockFullName();
    setLocked(true);
    if (onValidated) onValidated(getUserId(), fullName, email);
  };

  if (locked) {
    // Affichage supprimé : ne montre plus l'identité verrouillée
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Identity Confirmation</h2>
      <p className={styles.explanation}>Please confirm your full name (required) and email (optional). Your name will be locked after validation to ensure certificate security.</p>
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
