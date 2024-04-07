import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import Table from './Table.tsx';

interface ValueTableProps {
  array: number[][];
  sortArray?: () => void;
  onChange: (
    rowIndex: number,
    columnIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onClose?: () => void;
}

const ValueTable: React.FC<ValueTableProps> = ({
  array,
  sortArray,
  onChange,
  onClose,
}) => {
  const handleInputChange = (
    rowIndex: number,
    columnIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue !== '' && parseInt(inputValue) <= 999) {
      onChange(rowIndex, columnIndex, event);
    }
  };

  return (
    <div className="modal">
      {array.length > 0 && (
        <div className="unsorted-table">
          <MdOutlineCancel
            className="unsorted-table__cancel-btn"
            onClick={() => {
              onClose?.();
            }}
          />

          <div className="unsorted-table__header">
            <p>
              مقادیر مورد نظر برای هر سطر و ستون را وارد کنید.
              <br />
              توجه داشته باشید شما مجاز به وارد کردن اعداد مثبت تا سه رقم می
              باشید.
            </p>

            <button
              className="btn unsorted-table__sort-button"
              onClick={() => {
                sortArray?.();
                onClose?.();
              }}
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
                      <input
                        className="input-table"
                        min={0}
                        type="number"
                        value={value}
                        onChange={(event) =>
                          handleInputChange(rowIndex, columnIndex, event)
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
    </div>
  );
};

export default ValueTable;
