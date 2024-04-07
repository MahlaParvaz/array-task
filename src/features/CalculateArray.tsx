import React, { useState } from 'react';
import TextField from '../ui/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { randomSort } from '../utils/randomSort';
import UnsortedTable from '../ui/UnsortedTable';
import SortedResultTable from '../ui/SortedResultTable';
import Loading from '../ui/Loading';
interface FormData {
  row: number;
  column: number;
  errors?: string;
}

const CalculateArray: React.FC = () => {
  const [row, setRow] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);
  const [array, setArray] = useState<number[][]>([]);
  const [sortedArray, setSortedArray] = useState<number[][]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: { row: number; column: number }) => {
    const { row: rowValue, column: columnValue } = data;

    if (
      !(
        rowValue % 2 === 1 &&
        columnValue % 2 === 1 &&
        rowValue >= 4 &&
        columnValue >= 4
      )
    ) {
      toast.error(
        'ابعاد باید فرد و بزرگتر از 3 باشند ابعاد انتخابی بین 3 تا 39 باشند.'
      );
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setRow(rowValue);
    setColumn(columnValue);

    const newArray: number[][] = [];
    for (let i = 0; i < rowValue; i++) {
      const column: number[] = [];
      for (let j = 0; j < columnValue; j++) {
        column[j] = i * columnValue + j + 1;
      }
      newArray.push(column);
    }
    setIsSubmitting(false);

    const randomSortedArray = newArray.map((row) => randomSort(row));
    setArray(randomSortedArray);
    setSortedArray([]);
  };

  const handleChange = (
    rowIndex: number,
    columnIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value)) {
      return;
    }

    const newArray = array.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === columnIndex ? value : cell))
        : row
    );

    setArray(newArray);
  };

  const sortArray = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const sortedArray: number[][] = [...array];
    sortedArray.forEach((row) => {
      row.sort((a, b) => b - a);
    });

    sortedArray.forEach((row, index) => {
      if (index % 2 !== 0) {
        row.sort((a, b) => a - b);
      }
    });
    setIsLoading(false);
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
          {isSubmitting ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary">
              ایجاد آرایه
            </button>
          )}
        </div>
      </form>
      <UnsortedTable
        array={array}
        sortArray={sortArray}
        onChange={handleChange}
        isSubmitting={isLoading}
      />
      <SortedResultTable sortedArray={sortedArray} />
    </div>
  );
};

export default CalculateArray;
