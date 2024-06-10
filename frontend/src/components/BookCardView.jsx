import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = ({ title, imageFileName, author, fileName }) => {
  const [downloadStatus, setDownloadStatus] = useState('idle'); // 'idle', 'downloading', 'error'

  const handleDownload = async () => {
    setDownloadStatus('downloading'); // Update state for visual feedback

    try {
      const response = await fetch(`/uploads/pdfs/${fileName}`);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(url); // Clean up temporary URL
      setDownloadStatus('idle');
    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus('error'); // Update state for error message
    }
  };

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={`/uploads/books/${imageFileName}`} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{author}</p>
      </div>
      <button className="btn btn-primary mt-2" onClick={handleDownload}>
        {downloadStatus === 'downloading' ? 'Downloading...' : 'Download'}
      </button>
      {/* Conditionally display error message based on downloadStatus */}
      {downloadStatus === 'error' && <p>Download failed. Please try again.</p>}
    </div>
  );
};

export default ProductCard;
