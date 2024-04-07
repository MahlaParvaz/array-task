import React, { useState } from 'react';
import TextField from '../ui/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ValueTable from '../ui/ValueTable';
import SortedResultTable from '../ui/SortedResultTable';
import Popup from 'reactjs-popup';
import { toPersianNumbersWithComma } from '../utils/toPersianNumberWithComma';

interface FormData {
  row: number;
  column: number;
}

const CalculateArray: React.FC = () => {
  const [row, setRow] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);
  const [array, setArray] = useState<number[][]>([]);
  const [sortedArray, setSortedArray] = useState<number[][]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: { row: number; column: number }) => {
    const { row: rowValue, column: columnValue } = data;

    if (
      rowValue % 2 !== 1 ||
      columnValue % 2 !== 1 ||
      rowValue < 4 ||
      columnValue < 4
    ) {
      toast.error('ابعاد باید اعداد فرد و بزرگتر از 3 باشند.');
      return;
    }
    if (isNaN(rowValue) || isNaN(columnValue)) {
      toast.error('مقادیر باید عدد باشند.');
      return;
    }

    setRow(rowValue);
    setColumn(columnValue);

    const newArray: number[][] = [];
    for (let i = 0; i < rowValue; i++) {
      const column: number[] = [];
      for (let j = 0; j < columnValue; j++) {
        column[j] = 0;
      }
      newArray.push(column);
    }
    setArray(newArray);

    setIsPopupOpen(true);
  };

  const handleChange = (
    rowIndex: number,
    columnIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);

    if (isNaN(value)) {
      toast.error('لطفاً یک عدد معتبر وارد کنید.');
      return;
    }

    const newArray = array.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === columnIndex ? value : cell))
        : row
    );

    setArray(newArray);
  };

  const sortArray = () => {
    const sortedArray: number[][] = [...array];
    sortedArray.forEach((row) => {
      row.sort((a, b) => b - a);
    });

    sortedArray.forEach((row, index) => {
      if (index % 2 !== 0) {
        row.sort((a, b) => a - b);
      }
    });
    setSortedArray(sortedArray);
  };

  return (
    <div className="form">
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="تعداد سطر"
          name="row"
          value={toPersianNumbersWithComma(row.toString())}
          onChange={(event) => setRow(parseInt(event.target.value))}
          register={register}
          validationSchema={{
            required: 'تعداد سطر ها باید عددی بزرگتر از 3 و فرد باشد.',
            pattern: {
              value: /^[0-9]*$/,
              message: 'فقط مجاز به وارد کردن عدد می باشید.',
            },
          }}
          errors={errors}
        />
        <TextField
          label="تعداد ستون  "
          name="column"
          value={column.toString()}
          onChange={(event) => setColumn(parseInt(event.target.value))}
          register={register}
          validationSchema={{
            required: 'تعداد ستون ها باید عددی بزرگتر از 3 و فرد باشد.',
            pattern: {
              value: /^[0-9]*$/,
              message: 'فقط مجاز به وارد کردن عدد می باشید.',
            },
          }}
          errors={errors}
        />

        <div>
          <button type="submit" className="btn btn--primary">
            ایجاد آرایه
          </button>
        </div>
      </form>
      <Popup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        modal
        position="right center"
        contentStyle={{
          background: 'rgba(0, 0, 0, 0.6)',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        closeOnDocumentClick
      >
        {array.length > 0 && (
          <ValueTable
            array={array}
            sortArray={sortArray}
            onChange={handleChange}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </Popup>

      {sortedArray.length > 0 && (
        <SortedResultTable sortedArray={sortedArray} />
      )}
    </div>
  );
};

export default CalculateArray;
