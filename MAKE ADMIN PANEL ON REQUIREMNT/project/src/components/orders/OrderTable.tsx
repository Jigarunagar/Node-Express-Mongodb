import React from 'react';
import { Eye, Package, CreditCard } from 'lucide-react';
import { Order } from './OrderManagement';

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
}

export function OrderTable({ orders, onView, onUpdateStatus }: OrderTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'processing': return 'text-blue-500 bg-blue-500/10';
      case 'shipped': return 'text-purple-500 bg-purple-500/10';
      case 'delivered': return 'text-green-500 bg-green-500/10';
      case 'cancelled': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-500 bg-green-500/10';
      case 'pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'failed': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="card overflow-hidden">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="table-head">Order ID</th>
            <th className="table-head">Customer</th>
            <th className="table-head">Items</th>
            <th className="table-head">Total</th>
            <th className="table-head">Status</th>
            <th className="table-head">Payment</th>
            <th className="table-head">Date</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {orders.map((order) => (
            <tr key={order.id} className="table-row">
              <td className="table-cell font-mono text-sm text-foreground">
                {order.id}
              </td>
              <td className="table-cell">
                <div>
                  <p className="font-medium text-foreground">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                </div>
              </td>
              <td className="table-cell text-muted-foreground">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </td>
              <td className="table-cell font-medium text-foreground">
                ${order.total.toFixed(2)}
              </td>
              <td className="table-cell">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                  className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(order.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="table-cell">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  <CreditCard className="inline w-3 h-3 mr-1" />
                  {order.paymentStatus}
                </span>
              </td>
              <td className="table-cell text-muted-foreground">
                {order.createdAt}
              </td>
              <td className="table-cell">
                <button
                  onClick={() => onView(order)}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  title="View order details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}