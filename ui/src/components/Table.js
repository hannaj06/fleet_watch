import React from 'react';
import PrettyDate from './PrettyDate';

export function Table({ children }) {
  return <table className="table">{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="thead">{children}</thead>;
}

export function TableHeader({ children, textRight }) {
  return (
    <th className={`table-header ${textRight ? 'text-right' : ''}`}>
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className }) {
  return <tr className={`${className ? className : ''}`}>{children}</tr>;
}

export function TableCell({ children, textRight, label, content, className }) {
  return (
    <td
      className={`table-td ${textRight ? 'text-right' : ''} ${
        className ? className : ''
      }`}
    >
      {children ? (
        children
      ) : (
        <>
          <TableCellContent label={label}>{content}</TableCellContent>
        </>
      )}
    </td>
  );
}

export function TableDateCell({ date, fallback, label, ...rest }) {
  return (
    <TableCell {...rest}>
      <TableCellContent label={label}>
        <PrettyDate date={date} fallback={fallback} />
      </TableCellContent>
    </TableCell>
  );
}

function TableCellContent({ label, children }) {
  return (
    <>
      <span className="responsive-cell-label">{label}</span>
      <span className="cell-text">{children}</span>
    </>
  );
}
