// src/Test/QrCode.tsx
import React from 'react';
import QRCode from 'qrcode';

const QRCodeComponent: React.FC = () => {
  const canvasRefs = React.useRef<HTMLCanvasElement[]>([]);
  const seatNumbers = ['A1', 'B2', 'C3'];
  const routeName = 'Route 1';
  const passenger = 'John Doe';

  React.useEffect(() => {
    seatNumbers.forEach((seatNo, index) => {
      const qrText = `Seat No: ${seatNo}\nRoute: ${routeName}\nPassenger: ${passenger}`;
      QRCode.toCanvas(canvasRefs.current[index], qrText, { errorCorrectionLevel: 'H' }, (error) => {
        if (error) {
          console.error(error);
        }
      });
    });
  }, []);

  return (
    <div>
      {seatNumbers.map((seatNo, index) => (
        <div key={seatNo}>
          <h3>Seat No: {seatNo}</h3>
          <canvas ref={el => (canvasRefs.current[index] = el!)}></canvas>
        </div>
      ))}
    </div>
  );
};

export default QRCodeComponent;
