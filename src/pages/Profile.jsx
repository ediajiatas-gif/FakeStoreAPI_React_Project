// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { getUser, updateUser, deleteUserAccount } from '../lib/userService';

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const current = auth.currentUser;

      if (!current) {
        // no one is logged in, stop loading and show the "no profile" message
        setLoading(false);
        return;
      }

      const result = await getUser(current.uid); // fetch their Firestore profile

      if (result) {
        setUserData(result);
        setName(result.displayName || '');
        setAddress(result.address || '');
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const current = auth.currentUser;

    if (!current) return;

    await updateUser(current.uid, { displayName: name, address });

    // update what's shown on screen without needing to re-fetch
    setUserData({ ...userData, displayName: name, address });
    setEditing(false);
  };

  const handleDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!ok) return;

    const current = auth.currentUser;
    if (!current) return;

    await deleteUserAccount(current.uid);
    navigate('/'); // send them home after deleting
  };

  if (loading) {
    return (
      <div className="container py-4">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container py-4">
        <h3>No profile found. Please login.</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>My Profile</h2>
      <p><strong>Email:</strong> {userData.email}</p>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {userData.displayName}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;