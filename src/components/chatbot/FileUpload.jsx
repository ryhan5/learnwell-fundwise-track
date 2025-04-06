import { useState, useRef } from 'react';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * File upload component for chatbot to analyze files
 * like essays, resumes, or other documents
 */
const FileUpload = ({ onFileUpload, maxSizeMB = 5, acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'] }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length) {
      validateAndSetFile(droppedFiles[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setError('');
    setIsSuccess(false);
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }
    
    // Check file type
    const fileExtension = `.${file.name.split('.').pop().toLowerCase()}`;
    if (!acceptedFileTypes.includes(fileExtension)) {
      setError(`File type must be one of: ${acceptedFileTypes.join(', ')}`);
      return;
    }
    
    // Set the file
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would call the actual file upload endpoint here
      
      // Call the callback with the file
      if (onFileUpload) {
        onFileUpload(file);
      }
      
      setIsSuccess(true);
      
      // Reset after a delay
      setTimeout(() => {
        setFile(null);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
    setIsSuccess(false);
  };

  return (
    <div className="w-full">
      {file ? (
        <div className="border rounded-lg p-3 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isSuccess && !isUploading && (
                <button
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleRemoveFile}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          {!isSuccess && !isUploading && (
            <button
              className="mt-3 w-full bg-primary text-primary-foreground rounded-md py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors"
              onClick={handleUpload}
            >
              Upload for Analysis
            </button>
          )}
          
          {isUploading && (
            <div className="mt-3 w-full bg-secondary/50 text-secondary-foreground rounded-md py-1.5 text-sm font-medium flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </div>
          )}
          
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-3 w-full bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 rounded-md py-1.5 text-sm font-medium flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                File Uploaded Successfully
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all",
            isDragging ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50 hover:bg-secondary/20",
            error ? "border-red-300 bg-red-50 dark:border-red-800/40 dark:bg-red-900/20" : ""
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center py-2">
            <Upload className={cn("w-8 h-8 mb-2", error ? "text-red-500 dark:text-red-400" : "text-muted-foreground")} />
            <p className="text-sm font-medium">{error || `Drop file here or click to upload`}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {!error && `PDF, DOC, DOCX, TXT up to ${maxSizeMB}MB`}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileInput}
            ref={fileInputRef}
          />
        </div>
      )}
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-500 dark:text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload; 