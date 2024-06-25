import './SelectYear.css'
const SelectYear = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
  
    return (
      <div className="Year" style={{ display: 'flex', alignItems: 'center' }}>
        <select className="form-select form-select-lg mb-3 text-center" aria-label="Large select example" style={{ fontSize: '16px' }}>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectYear;