import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

/**
 * Hook to generate QR code from leave ID
 * @param {Object} leave - Leave object
 * @returns {string} QR code data URL
 */
const useQRCode = (leave) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  useEffect(() => {
    if (!leave?._id) return;

    QRCode.toDataURL(leave._id, {
      width: 150,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then(setQrCodeDataURL)
      .catch((err) => console.error('QR Code generation failed:', err));
  }, [leave?._id]);

  return qrCodeDataURL;
};

export default useQRCode;
