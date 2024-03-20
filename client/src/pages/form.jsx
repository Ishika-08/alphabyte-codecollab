import React, { useState } from 'react';

const Form = () => {
  const [file, setFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the file to the first file in the event target files array
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    // Use FormData to construct the data payload
    const formData = new FormData();
    formData.append('file', file); // Append the file under the key 'file'

    try {
      // Replace '/upload/kk44' with your actual upload URL path and interviewerId if needed
      const response = await fetch('http://localhost:3000/upload/kk44', {
        method: 'POST',
        body: formData, // Send the form data as the request body
      });

      if (response.ok) {
        const result = await response.json();
        alert('File uploaded successfully!');
        console.log(result); // Log the result or handle it as needed
      } else {
        // If the server response is not ok, throw an error
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
    } catch (error) {
      // Catch any errors and alert the user
      alert(error.message);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center p-12">
      <div className="shadow-2xl rounded-3xl mx-auto w-full max-w-[550px]">
        <h1 className="text-center text-2xl font-bold text-violet-600 sm:text-3xl">Upload File</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Upload the Excel file which contains data of all the scheduled interviews.
        </p>
        <form className="py-6 px-9" onSubmit={handleFormSubmit}>
          {/* ... other input fields ... */}
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload Excel File
            </label>
            <div className="mb-8">
              <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} />
              <label htmlFor="file" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop file here
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              Send File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
