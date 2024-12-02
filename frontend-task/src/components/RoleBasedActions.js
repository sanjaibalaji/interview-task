import React from 'react';

const RoleBasedActions = ({ role }) => {
  if (role === 'admin') {
    return (
      <div>
        <h2 className="text-xl font-bold mt-6">Admin Actions</h2>
        <ul>
          <li>Create, View, Edit, and Delete Countries</li>
          <li>Create, View, Edit, and Delete States</li>
          <li>Create, View, Edit, and Delete Districts</li>
          <li>Create, View, Edit, and Delete Taluks</li>
        </ul>
      </div>
    );
  }

  if (role === 'manager') {
    return (
      <div>
        <h2 className="text-xl font-bold mt-6">Manager Actions</h2>
        <ul>
          <li>View and Edit Countries</li>
          <li>View and Edit States</li>
          <li>View and Edit Districts</li>
          <li>View and Edit Taluks</li>
        </ul>
      </div>
    );
  }

  if (role === 'user') {
    return (
      <div>
        <h2 className="text-xl font-bold mt-6">User Actions</h2>
        <ul>
          <li>View Countries</li>
          <li>View States</li>
          <li>View Districts</li>
          <li>View Taluks</li>
        </ul>
      </div>
    );
  }

  return null; // Fallback if role is not recognized
};

export default RoleBasedActions;
