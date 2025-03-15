/*************************************************************************
 * @file ImageCropModal.tsx
 * @author Ramiro Santos
 * @desc  This is the component for ImageCropModal of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import { Dialog } from "@mui/material";
import React, { useState, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (croppedImage: string) => void;
}

const ImageCropModal = ({ open, onClose, imageUrl, onSave }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState(128);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState(128);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const img = imageRef.current;
    if (img) {
      const handleImageLoad = () => {
        const bounds = img.getBoundingClientRect();
        setPosition({
          x: (bounds.width - size) / 2,
          y: (bounds.height - size) / 2
        });
      };

      img.addEventListener('load', handleImageLoad);
      return () => img.removeEventListener('load', handleImageLoad);
    }
  }, [size, imageUrl]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const bounds = imageRef.current.getBoundingClientRect();
    const containerRect = e.currentTarget.getBoundingClientRect();
    
    if (isDragging) {
      const x = Math.max(
        bounds.left - containerRect.left, 
        Math.min(
          e.clientX - containerRect.left, 
          bounds.right - containerRect.left - size
        )
      );
      const y = Math.max(
        bounds.top - containerRect.top, 
        Math.min(
          e.clientY - containerRect.top, 
          bounds.bottom - containerRect.top - size
        )
      );
      setPosition({ x, y });
    } else if (isResizing) {
      const dx = e.clientX - resizeStartPos.x;
      const dy = e.clientY - resizeStartPos.y;
      const delta = Math.max(dx, dy);
      const maxSize = Math.min(
        bounds.width,
        bounds.height,
        bounds.right - containerRect.left - position.x,
        bounds.bottom - containerRect.top - position.y
      );
      const newSize = Math.max(128, Math.min(initialSize + delta, maxSize));
      setSize(newSize);
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    setInitialSize(size);
  };

  const getCroppedImage = () => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const outputSize = 128;
    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imageRef.current;
    const imageRect = image.getBoundingClientRect();
    const containerRect = image.parentElement?.getBoundingClientRect();
    
    if (!containerRect) return;

    // Calculate the actual displayed image dimensions
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    const containerAspectRatio = imageRect.width / imageRect.height;

    let displayedWidth = imageRect.width;
    let displayedHeight = imageRect.height;

    if (imageAspectRatio > containerAspectRatio) {
      displayedHeight = displayedWidth / imageAspectRatio;
    } else {
      displayedWidth = displayedHeight * imageAspectRatio;
    }

    // Calculate image position within container
    const imageLeft = (containerRect.width - displayedWidth) / 2;
    const imageTop = (containerRect.height - displayedHeight) / 2;

    // Calculate scaling factors
    const scaleX = image.naturalWidth / displayedWidth;
    const scaleY = image.naturalHeight / displayedHeight;

    // Calculate the center of the crop square
    const centerX = position.x + (size / 2);
    const centerY = position.y + (size / 2);

    // Calculate the crop area relative to the actual image
    const cropX = ((centerX - (size / 2) - imageLeft)) * scaleX;
    const cropY = ((centerY - (size / 2) - imageTop)) * scaleY;
    const cropSize = size * scaleX;

    // Ensure crop area stays within image bounds
    const safeX = Math.max(0, Math.min(cropX, image.naturalWidth - cropSize));
    const safeY = Math.max(0, Math.min(cropY, image.naturalHeight - cropSize));

    ctx.drawImage(
      image,
      safeX,                // source x
      safeY,                // source y
      cropSize,             // source width
      cropSize,             // source height
      0,                    // destination x
      0,                    // destination y
      outputSize,           // destination width
      outputSize            // destination height
    );

    const base64Image = canvas.toDataURL('image/jpeg', 1.0);
    onSave(base64Image);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#1c1c1c',
          borderRadius: '12px',
          overflow: 'hidden'
        }
      }}
    >
      <div className="flex flex-col gap-6 m-6">
        <div className="text-white text-xl font-semibold">
          Adjust Profile Picture
        </div>
        
        <div 
          className="flex justify-center relative"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          style={{ 
            width: '100%',
            height: '70vh',
            overflow: 'hidden'
          }}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Crop me"
            style={{ 
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none',
              MozUserSelect: 'none',
              pointerEvents: 'none',
              touchAction: 'none',
              WebkitTouchCallout: 'none',
            }}
            draggable={false}
          />
          
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: 'transparent',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
              }}
            />
          </div>

          <div 
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              width: `${size}px`,
              height: `${size}px`,
              border: '2px solid white',
              pointerEvents: 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
            }}
          >
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                {i < 2 && (
                  <div style={{
                    position: 'absolute',
                    left: `${(i + 1) * 33.33}%`,
                    top: 0,
                    width: '1px',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                  }} />
                )}
                {i < 2 && (
                  <div style={{
                    position: 'absolute',
                    top: `${(i + 1) * 33.33}%`,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                  }} />
                )}
              </React.Fragment>
            ))}
            
            <div
              style={{
                position: 'absolute',
                right: '-6px',
                bottom: '-6px',
                width: '12px',
                height: '12px',
                backgroundColor: 'white',
                cursor: 'nwse-resize',
                pointerEvents: 'all'
              }}
              onMouseDown={handleResizeStart}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-[60px] text-sm font-semibold border border-eclipseGray text-mediumGray"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImage}
            className="py-2 px-4 rounded-[60px] text-sm font-semibold bg-limeGreen border-limeGreen text-jetBlack"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageCropModal; 