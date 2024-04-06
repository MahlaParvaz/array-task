import React, { useState } from 'react';
import TextField from '../ui/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { randomSort } from '../utils/randomSort';
import Table from '../ui/Table';
import { toPersianNumbersWithComma } from '../utils/toPersianNumberWithComma';
import ValueTable from '../ui/valueTable';
import SortedResultTable from '../ui/SortedResultTable';

const CalculateArray: React.FC = () => {
  const [row, setRow] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);
  const [array, setArray] = useState<number[][]>([]);
  const [sortedArray, setSortedArray] = useState<number[][]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { row: number; column: number }) => {
    const { row: rowValue, column: columnValue } = data;

    if (
      rowValue % 2 === 0 ||
      columnValue % 2 === 0 ||
      rowValue < 4 ||
      columnValue < 4
    ) {
      toast.error('ابعاد باید فرد و بزرگتر از 3 باشند.');
      return;
    }

    setRow(rowValue);
    setColumn(columnValue);

    const newArray: number[][] = [];
    for (let i = 0; i < columnValue; i++) {
      const row: number[] = new Array(rowValue);
      for (let j = 0; j < rowValue; j++) {
        row[j] = i * rowValue + j + 1;
      }
      newArray.push(row);
    }

    // Randomly sort the array
    const randomSortedArray = newArray.map((row) => randomSort(row));
    setArray(randomSortedArray);
    setSortedArray([]);
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
          label="تعداد سطر  "
          name="row"
          value={row.toString()}
          onChange={(event) => setRow(parseInt(event.target.value, 10))}
          register={register}
          validationSchema={{
            required: 'تعداد سطر ها باید عددی بزرگتر از 3 و فرد باشد.',
          }}
          errors={errors}
        />
        <TextField
          label="تعداد ستون  "
          name="column"
          value={column.toString()}
          onChange={(event) => setColumn(parseInt(event.target.value, 10))}
          register={register}
          validationSchema={{
            required: 'تعداد ستون ها باید عددی بزرگتر از 3 و فرد باشد.',
          }}
          errors={errors}
        />
        <div>
          <button type="submit" className="btn btn--primary">
            ایجاد آرایه
          </button>
        </div>
      </form>
      <ValueTable array={array} sortArray={sortArray} />
      <SortedResultTable sortedArray={sortedArray} />
    </div>
  );
};

export default CalculateArray;
