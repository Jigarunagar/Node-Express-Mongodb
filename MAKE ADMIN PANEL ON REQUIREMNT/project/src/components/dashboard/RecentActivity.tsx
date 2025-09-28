import React from 'react';
import { Clock, User, Package, ShoppingCart } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'user',
    message: 'New user John Doe registered',
    time: '2 minutes ago',
    icon: User,
  },
  {
    id: 2,
    type: 'order',
    message: 'Order #1234 was completed',
    time: '15 minutes ago',
    icon: ShoppingCart,
  },
  {
    id: 3,
    type: 'product',
    message: 'Product "Wireless Headphones" was updated',
    time: '1 hour ago',
    icon: Package,
  },
  {
    id: 4,
    type: 'user',
    message: 'User Sarah Smith updated profile',
    time: '2 hours ago',
    icon: User,
  },
  {
    id: 5,
    type: 'order',
    message: 'Order #1235 was placed',
    time: '3 hours ago',
    icon: ShoppingCart,
  },
];

export function RecentActivity() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Clock className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}