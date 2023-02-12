export const Invoices = [
    {
      id: 1,
      customerId: 1, // thor
      amount: 100,
    },
    {
      id: 1,
      customerId: 1, // thor
      amount: 50,
    },
    {
      id: 1,
      customerId: 2, // hulk
      amount: 70,
    },
  ];

// import {FLOAT, INTEGER} from 'sequelize';

// import dbase from './index'

// export const Invoices = dbase?.define('mula_invoices,', {
//   customerId: {
//     type: INTEGER,
//     references: {
//       model:{
//         tableName: 'mula_users'
//       },
//       key: 'id'
//     },
//     allowNull: false
//   },
//   amount: {
//     type: FLOAT,
//     allowNull: false
//   },
// });