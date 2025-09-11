import React from 'react';
import { Edit, Trash2, Shield, ShieldOff, User } from 'lucide-react';
import { User as UserType } from './UserManagement';

interface UserTableProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (userId: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-500 bg-red-500/10';
      case 'editor': return 'text-blue-500 bg-blue-500/10';
      case 'user': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-500 bg-green-500/10' 
      : 'text-red-500 bg-red-500/10';
  };

  return (
    <div className="card overflow-hidden">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="table-head">User</th>
            <th className="table-head">Role</th>
            <th className="table-head">Status</th>
            <th className="table-head">Created</th>
            <th className="table-head">Last Login</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell">
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="table-cell">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </td>
              <td className="table-cell">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </td>
              <td className="table-cell text-muted-foreground">
                {user.createdAt}
              </td>
              <td className="table-cell text-muted-foreground">
                {user.lastLogin}
              </td>
              <td className="table-cell">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    title="Edit user"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}