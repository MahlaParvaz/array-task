function Table({ children }) {
  return (
    <div className="table">
      <table>{children}</table>
    </div>
  );
}

export default Table;

function TableHeader({ children }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}
function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
function TableRow({ children }) {
  return <tr>{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
