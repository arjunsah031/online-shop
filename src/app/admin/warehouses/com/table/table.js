import React from 'react';
import styles from './Table.module.css';

export default function Table  ({ columns, data })  {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableContainer}>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
           
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tableRow}>
              {columns.map((column) => (
                <td key={column.accessor} className={styles.tableCell}>
                  {row[column.accessor]}
                </td>

              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
