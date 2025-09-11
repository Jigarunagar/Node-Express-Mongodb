import React from 'react';
import { X, Package, User, CreditCard } from 'lucide-react';
import { Order } from './OrderManagement';

interface OrderModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
}

export function OrderModal({ order, onClose, onUpdateStatus }: OrderModalProps) {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Order Details - {order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="card p-4">
            <div className="flex items-center mb-3">
              <User className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold text-foreground">Customer Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{order.customerEmail}</p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="card p-4">
            <div className="flex items-center mb-3">
              <Package className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold text-foreground">Order Status</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created Date</p>
                <p className="font-medium text-foreground">{order.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium text-foreground">{order.updatedAt}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Update Status</p>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                className="input w-auto"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Order Items */}
          <div className="card p-4">
            <h3 className="font-semibold text-foreground mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-medium text-foreground">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 mt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-foreground">Total</p>
                <p className="text-lg font-bold text-foreground">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="card p-4">
            <div className="flex items-center mb-3">
              <CreditCard className="w-5 h-5 text-primary mr-2" />
              <h3 className="font-semibold text-foreground">Payment Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  order.paymentStatus === 'paid' ? 'text-green-500 bg-green-500/10' :
                  order.paymentStatus === 'pending' ? 'text-yellow-500 bg-yellow-500/10' :
                  'text-red-500 bg-red-500/10'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}