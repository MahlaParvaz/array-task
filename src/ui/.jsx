import React, { useState } from 'react';

// تابعی برای مرتب سازی تصادفی یک آرایه
const shuffle = (array: number[]): number[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App: React.FC = () => {
  const [m, setM] = useState<number>(0);
  const [n, setN] = useState<number>(0);
  const [array, setArray] = useState<number[][]>([]);
  const [sortedArray, setSortedArray] = useState<number[][]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mValue = parseInt(event.currentTarget['m'].value, 10);
    const nValue = parseInt(event.currentTarget['n'].value, 10);

    if (isNaN(mValue) || isNaN(nValue) || mValue % 2 === 0 || nValue % 2 === 0 || mValue < 4 || nValue < 4) {
      alert('ابعاد باید فرد و بزرگتر از 3 باشند.');
      return;
    }

    setM(mValue);
    setN(nValue);

    const newArray: number[][] = [];
    for (let i = 0; i < mValue; i++) {
      const row: number[] = [];
      for (let j = 0; j < nValue; j++) {
        row.push(i * nValue + j + 1);
      }
      newArray.push(row);
    }

    // تصادفی کردن آرایه
    const shuffledArray = newArray.map(row => shuffle(row));
    setArray(shuffledArray);
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
      i === rowIndex ? row.map((cell, j) => (j === columnIndex ? value : cell)) : row
    );

    setArray(newArray);
  };

  const sortArray = () => {
    const sortedArray: number[][] = [...array];

    for (let i = 0; i < m; i++) {
      if (i % 2 === 0) {
        sortedArray[i].sort((a, b) => a - b); // صعودی
      } else {
        sortedArray[i].sort((a, b) => b - a); // نزولی
      }
    }

    setSortedArray(sortedArray);
  };

  return (
    <div>
      <h1>مرتب کردن سطرهای آرایه دو بعدی</h1>

      <form onSubmit={handleSubmit}>
        <label>m:</label>
        <input
          type="number"
          name="m"
          value={m}
          onChange={(event) => setM(parseInt(event.target.value, 10))}
        />

        <label>n:</label>
        <input
          type="number"
          name="n"
          value={n}
          onChange={(event) => setN(parseInt(event.target.value, 10))}
        />

        <button type="submit">ایجاد آرایه</button>
      </form>

      {array.length > 0 && (
        <div>
          <h2>ورود مقادیر</h2>

          <table>
            <tbody>
              {array.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, columnIndex) => (
                    <td key={columnIndex}>
                      <input
                        type="number"
                        value={value}
                        onChange={(event) =>
                          handleChange(rowIndex, columnIndex, event)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={sortArray}>مرتب سازی</button>
        </div>
      )}

      {sortedArray.length > 0 && (
        <div>
          <h2>نتیجه</h2>

          <table>
            <tbody>
              {sortedArray.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, columnIndex) => (
                    <td key={columnIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
