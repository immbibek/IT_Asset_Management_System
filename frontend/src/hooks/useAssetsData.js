import { useState } from "react";

const useAssetsData = () => {
  const [assets] = useState([
    {
      id: 'AST-001',
      name: 'MacBook Pro 16"',
      category: 'Laptop',
      serialNumber: 'MBP-2023-001',
      purchaseDate: '2023-01-15',
      status: 'Available',
      cost: '$2,499',
    },
    {
      id: 'AST-002',
      name: 'Dell Monitor 27"',
      category: 'Monitor',
      serialNumber: 'DEL-MON-789',
      purchaseDate: '2023-02-20',
      status: 'Assigned',
      cost: '$399',
    },
    {
      id: 'AST-003',
      name: 'iPhone 14 Pro',
      category: 'Phone',
      serialNumber: 'IPH-14P-456',
      purchaseDate: '2023-03-10',
      status: 'Available',
      cost: '$1,099',
    },
    {
      id: 'AST-004',
      name: 'Logitech Mouse MX Master',
      category: 'Accessory',
      serialNumber: 'LOG-MX3-123',
      purchaseDate: '2023-01-25',
      status: 'Assigned',
      cost: '$99',
    },
    {
      id: 'AST-005',
      name: 'HP Printer LaserJet',
      category: 'Printer',
      serialNumber: 'HP-LJ-890',
      purchaseDate: '2022-11-05',
      status: 'Under Maintenance',
      cost: '$549',
    },
  ]);

  return { assets };
};

export default useAssetsData;
