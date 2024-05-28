import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";

function PassengerForm() {
  return (
    <div>
      <PrimaryNavBar />
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#042F40"
          className="bi bi-arrow-left-circle col-1 my-3 mx-5"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </a>
      <div className="row">
        
      
      <svg xmlns="http://www.w3.org/2000/svg" width="1050" height="161" viewBox="0 0 1050 161" fill="none">
  <g filter="url(#filter0_d_2_8543)">
    
    <path d="M4 0H1035C1041.08 0 1046 4.92487 1046 11V142C1046 148.075 1041.08 153 1035 153H15C8.92488 153 4 148.075 4 142V0Z" fill="white"/>
    
  </g>
  <defs>
  
    <filter id="filter0_d_2_8543" x="0" y="0" width="1050" height="161" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_8543"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_8543" result="shape"/>
      
    </filter>
  </defs>
  <div>
    
  </div>
  
</svg>

      </div>
    </div>
  );
}
export default PassengerForm;