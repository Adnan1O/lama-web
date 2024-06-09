import React from 'react';
import "./Files.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
const Files = ({ projectId,projectData, params, onChange  }) => {
  const router = useRouter()
  const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";




  const handleEdit = (id) => {
    const transcript = params.id
    router.push(`/dashboard/${transcript}/${id}`, { scroll: false })
  };
  const DeleteFile =async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteFile/${projectId}/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        return toast.error('error occured please try again later');
      }
      onChange()
       toast.success('file deleted successfully')
     
    } catch (error) {
      toast.error('error occured please try again later');
      console.error(error);
    }
  };

  return (
    <div className="files-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Upload Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((file) => (
            <tr key={file._id}>
              <td>{file.fileName}</td>
              <td>{new Date(file.dateAdded).toLocaleString()}</td>
              <td>{file.status || 'Done'}</td>
              <td>
                <button onClick={() => handleEdit(file._id)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => DeleteFile(file._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer 
        closeButton={false}
        position="top-center"/>
    </div>
  );
};

export default Files;
