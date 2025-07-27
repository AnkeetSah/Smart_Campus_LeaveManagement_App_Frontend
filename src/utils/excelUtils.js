import * as XLSX from 'xlsx';

export const extractExcelData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet name
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // You can add validation or transformation here if needed
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Error processing Excel file: ' + error.message));
      }
    };

    reader.onerror = (error) => {
      reject(new Error('Error reading file: ' + error.message));
    };

    reader.readAsArrayBuffer(file);
  });
};