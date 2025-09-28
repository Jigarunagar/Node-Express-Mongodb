import React from 'react';
import { Edit, Trash2, Package } from 'lucide-react';
import { Product } from './ProductManagement';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
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
            <th className="table-head">Product</th>
            <th className="table-head">Category</th>
            <th className="table-head">Price</th>
            <th className="table-head">Stock</th>
            <th className="table-head">Status</th>
            <th className="table-head">Updated</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products.map((product) => (
            <tr key={product.id} className="table-row">
              <td className="table-cell">
                <div className="flex items-center space-x-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {product.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="table-cell text-muted-foreground">
                {product.category}
              </td>
              <td className="table-cell font-medium text-foreground">
                ${product.price}
              </td>
              <td className="table-cell text-muted-foreground">
                {product.stock}
              </td>
              <td className="table-cell">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </td>
              <td className="table-cell text-muted-foreground">
                {product.updatedAt}
              </td>
              <td className="table-cell">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    title="Edit product"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    title="Delete product"
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