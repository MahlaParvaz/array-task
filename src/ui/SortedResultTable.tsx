import React from 'react';
import { toPersianNumbersWithComma } from '../utils/toPersianNumberWithComma';
import Table from './Table.tsx';

interface SortedResultTableProps {
  sortedArray: number[][];
}

const SortedResultTable: React.FC<SortedResultTableProps> = ({
  sortedArray,
}) => {
  return (
    <div>
      {sortedArray.length > 0 && (
        <div className="sorted-table">
          <h2> نتیجه مرتب سازی</h2>
          <div className="sorted-table__content">
            <Table>
              <Table.Body>
                {sortedArray.map((row, rowIndex) => (
                  <Table.Row key={rowIndex}>
                    {row.map((value, columnIndex) => (
                      <td key={columnIndex}>
                        {toPersianNumbersWithComma(value)}
                      </td>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
export default SortedResultTable;
