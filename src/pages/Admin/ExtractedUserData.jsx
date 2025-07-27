import React from 'react';

const convertExcelDate = (serial) => {
  if (typeof serial === 'number') {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
  }
  return serial;
};

const ExtractedUserData = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center shadow-sm">
        <div className="text-gray-500 text-sm font-medium">
          No data to display
        </div>
      </div>
    );
  }

  const headers = data.reduce((acc, row) => {
    Object.keys(row).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);

  const maxVisibleRows = 10;
  const rowHeight = 42; // Slightly increased row height
  const tableHeight = `${Math.min(data.length, maxVisibleRows) * rowHeight}px`;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <span className="bg-blue-100 px-3 py-1 rounded-md">Extracted User Data</span>
        </h2>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {data.length} records
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-xs">
        <div 
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50"
          style={{ 
            maxHeight: data.length > maxVisibleRows ? '420px' : 'auto',
            minHeight: tableHeight
          }}
        >
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-600 sticky top-0">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`transition-colors ${rowIndex % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-blue-50 hover:bg-blue-100'}`}
                >
                  {headers.map((header, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700"
                    >
                      {header.toLowerCase().includes('date')
                        ? convertExcelDate(row[header])
                        : String(row[header] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Scroll vertically to view more records
      </div>
    </div>
  );
};

export default ExtractedUserData;