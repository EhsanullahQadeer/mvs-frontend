/*************************************************************************
 * @file ImageCropModal.tsx
 * @author Ramiro Santos
 * @desc  This is the component for ImageCropModal of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import { Dialog } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (croppedImage: string, imageType: string) => void;
}

const ImageCropModal = ({ open, onClose, imageUrl, onSave }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState(128);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState(128);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fileType, setFileType] = useState<string>('');

  // Detect file type when image URL changes
  useEffect(() => {
    const detectFileType = async () => {
      try {
        const response = await fetch(imageUrl);
        const contentType = response.headers.get('content-type');
        if (contentType) {
          if (contentType.includes('gif')) {
            setFileType('GIF');
          } else if (contentType.includes('jpeg') || contentType.includes('jpg')) {
            setFileType('JPEG');
          } else if (contentType.includes('png')) {
            setFileType('PNG');
          } else if (contentType.includes('webp')) {
            setFileType('WebP');
          } else {
            setFileType('Image');
          }
        }
      } catch (error) {
        console.error('Error detecting file type:', error);
        setFileType('Image');
      }
    };

    if (imageUrl) {
      detectFileType();
    }
  }, [imageUrl]);

  const calculateAndSetPosition = () => {
    const img = imageRef.current;
    if (!img) return;

    const bounds = img.getBoundingClientRect();
    const containerRect = img.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate the actual displayed image dimensions
    const imageAspectRatio = img.naturalWidth / img.naturalHeight;
    const containerAspectRatio = bounds.width / bounds.height;

    let displayedWidth = bounds.width;
    let displayedHeight = bounds.height;

    if (imageAspectRatio > containerAspectRatio) {
      displayedHeight = displayedWidth / imageAspectRatio;
    } else {
      displayedWidth = displayedHeight * imageAspectRatio;
    }

    // Calculate the actual visible image boundaries
    const imageLeft = Math.floor((containerRect.width - displayedWidth) / 2);
    const imageTop = Math.floor((containerRect.height - displayedHeight) / 2);

    // Calculate center position
    const centerX = imageLeft + (displayedWidth - size) / 2;
    const centerY = imageTop + (displayedHeight - size) / 2;

    console.log('Calculating new position:', {
      centerX: Math.floor(centerX),
      centerY: Math.floor(centerY),
      imageLeft,
      imageTop,
      displayedWidth,
      displayedHeight
    });

    // Force position update
    setPosition({
      x: Math.floor(centerX),
      y: Math.floor(centerY)
    });
  };

  // Handle initial position when modal opens
  useEffect(() => {
    if (open) {
      const img = imageRef.current;
      if (img && img.complete) {
        calculateAndSetPosition();
      }
    }
  }, [open]);

  useEffect(() => {
    console.log("Position updated:", position);
  }, [position]);

  // Handle image load
  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      const handleLoad = () => {
        setImageLoaded(true);
      };
      
      if (img.complete) {
        setImageLoaded(true);
      } else {
        img.addEventListener('load', handleLoad);
        return () => img.removeEventListener('load', handleLoad);
      }
    }
  }, [imageUrl]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const bounds = imageRef.current.getBoundingClientRect();
    const containerRect = e.currentTarget.getBoundingClientRect();
    
    // Calculate actual image dimensions and position
    const imageAspectRatio = imageRef.current.naturalWidth / imageRef.current.naturalHeight;
    const containerAspectRatio = bounds.width / bounds.height;

    let displayedWidth = bounds.width;
    let displayedHeight = bounds.height;

    if (imageAspectRatio > containerAspectRatio) {
      displayedHeight = displayedWidth / imageAspectRatio;
    } else {
      displayedWidth = displayedHeight * imageAspectRatio;
    }

    // Calculate the actual visible image boundaries
    const imageLeft = (containerRect.width - displayedWidth) / 2;
    const imageRight = imageLeft + displayedWidth;
    const imageTop = (containerRect.height - displayedHeight) / 2;
    const imageBottom = imageTop + displayedHeight;
    
    if (isDragging) {
      // Constrain movement to actual visible image bounds
      const x = Math.max(
        imageLeft,
        Math.min(
          e.clientX - containerRect.left - (size / 2),
          imageRight - size
        )
      );
      const y = Math.max(
        imageTop,
        Math.min(
          e.clientY - containerRect.top - (size / 2),
          imageBottom - size
        )
      );
      setPosition({ x, y });
    } else if (isResizing) {
      const dx = e.clientX - resizeStartPos.x;
      const dy = e.clientY - resizeStartPos.y;
      const delta = Math.max(dx, dy);
      
      // Constrain maximum size to fit within visible image bounds
      const maxSize = Math.min(
        imageRight - position.x,
        imageBottom - position.y,
        displayedWidth,
        displayedHeight
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

    // Calculate the center of the crop square, accounting for 2px border
    const centerX = position.x + (size / 2);
    const centerY = position.y + (size / 2);

    // Calculate the crop area relative to the actual image
    const cropX = ((centerX - (size / 2) - imageLeft)) * scaleX;
    const cropY = ((centerY - (size / 2) - imageTop)) * scaleY;
    const cropSize = size * scaleX;

    // Ensure crop area stays within image bounds
    const safeX = Math.max(0, Math.min(cropX, image.naturalWidth - cropSize));
    const safeY = Math.max(0, Math.min(cropY, image.naturalHeight - cropSize));

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

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

    // Determine the output format based on the original file type
    let outputFormat = 'image/png'; // default to PNG
    switch (fileType.toLowerCase()) {
      case 'gif':
        outputFormat = 'image/gif';
        break;
      case 'jpeg':
      case 'jpg':
        outputFormat = 'image/jpeg';
        break;
      case 'png':
        outputFormat = 'image/png';
        break;
      case 'webp':
        outputFormat = 'image/webp';
        break;
      default:
        outputFormat = 'image/png';
    }

    const base64Image = canvas.toDataURL(outputFormat);
    onSave(base64Image, fileType.toLowerCase());
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
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-semibold">
            Adjust Profile Picture
          </div>
          <div className="text-mediumGray text-sm">
            File Type: {fileType}
          </div>
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
            overflow: 'hidden',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none'
          }}
          draggable={false}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Crop me"
            onLoad={calculateAndSetPosition}
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
              KhtmlUserSelect: 'none',
              cursor: 'default'
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