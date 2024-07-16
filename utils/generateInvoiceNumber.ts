
let currentSequentialNumber = 0; 

export function generateInvoiceNumber(): string {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
  
  currentSequentialNumber++; 
  const formattedSequentialNumber = currentSequentialNumber.toString().padStart(4, '0'); 
  
  return `INV-${formattedDate}-${formattedSequentialNumber}`;
}
