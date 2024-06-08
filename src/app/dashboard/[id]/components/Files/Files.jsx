import React from 'react';
import "./Files.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Files = ({ projectId,projectData  }) => {

  const handleEdit = (id) => {
   
  };
  const DeleteFile =async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/deleteFile/${projectId}/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        toast.error('error occured please try again later');
      }
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
        position="top-center"/>
    </div>
  );
};

export default Files;
