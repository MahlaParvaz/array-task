import React from 'react';
import Table from './Table';
import { toPersianNumbersWithComma } from '../utils/toPersianNumberWithComma';
import Loading from './Loading';

interface ValueTableProps {
  array: number[][];
  sortArray?: () => void;
  isSubmitting: boolean;
  onChange: (
    rowIndex: number,
    columnIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const UnsortedTable: React.FC<ValueTableProps> = ({
  array,
  sortArray,
  onChange,
  isSubmitting,
}) => {
  return (
    <>
      {array.length > 0 && (
        <div className="unsorted-table">
          <div className="unsorted-table__header">
            <h2> جدول مرتب نشده</h2>
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                className="btn unsorted-table__sort-button"
                onClick={sortArray}
              >
                مرتب سازی
              </button>
            )}
          </div>
          <Table>
            <Table.Body>
              {array.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {row.map((value, columnIndex) => (
                    <td key={columnIndex}>
                      <input
                        type="text"
                        value={value}
                        // value={toPersianNumbersWithComma(value)}
                        pattern="\d*"
                        maxlength="4"
                        onChange={(event) =>
                          onChange(rowIndex, columnIndex, event)
                        }
                      />
                    </td>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};
export default UnsortedTable;
