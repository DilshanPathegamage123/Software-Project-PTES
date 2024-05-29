import './SelectMonth.css';
const SelectMonth = () => {
  const months = [
    '01', '02', '03', '04',
    '05', '06', '07', '08',
    '09', '10', '11', '12'
  ];

  return (
    <div className="month">
      {/* <select className="form-control" aria-label="Default select example" style={{ width: 162.19, height: 52.32, marginRight: '14px'}}  > */}
      <select className="form-select form-select-lg mb-3 text-center" aria-label="Large select example" style={{ fontSize: '16px' }}>
        {months.map((month, index) => (
          <option key={index} value={month} style={{ fontSize: '16px' }}>{month}</option>
        ))}
      </select>
    </div>
    
  );
};



export default SelectMonth;