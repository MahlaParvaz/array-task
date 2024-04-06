import React from 'react';
import Table from './Table';
import { toPersianNumbersWithComma } from '../utils/toPersianNumberWithComma';

type Props = {};

export default function ValueTable({ array, sortArray }: Props) {
  return (
    <div className="table-container">
      {array.length > 0 && (
        <div className="unsorted-table">
          <div className="unsorted-table__header">
            <h2> جدول مرتب نشده</h2>
            <button
              className="btn unsorted-table__sort-button"
              onClick={sortArray}
            >
              مرتب سازی
            </button>
          </div>

          <Table>
            <Table.Body>
              {array.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {row.map((value, columnIndex) => (
                    <td key={columnIndex}>
                      {toPersianNumbersWithComma(value.toString())}
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
