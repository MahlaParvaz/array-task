import React from 'react';
import { toPersianNumbersWithComma } from '../utils/toPersianNumberWithComma';
import Table from './Table';

type Props = {};

export default function SortedResultTable({ sortedArray }: Props) {
  return (
    <div>
      {sortedArray.length > 0 && (
        <div>
          <h2>نتیجه</h2>

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
      )}
    </div>
  );
}
