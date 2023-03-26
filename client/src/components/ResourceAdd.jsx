import React, { useState } from 'react'



const ResourceAdd = () => {

  const [resource, setResource] = 
    useState({ imageFile: null, imagePath: '', name: '', birthday: '', gender: '', job: ''});

  const handleFileChange = (e) => {
    const resourceCopy = {...resource, imageFile: e.target.files[0]};
    setResource(resourceCopy);
  };

  const handleValueChenge = (e) => {
    const keyValue = e.target.name;
    const resourceCopy = {...resource, [keyValue]: e.target.value };
    setResource(resourceCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // db 추가 
    console.log(resource);
  };

  return (
    <div style={{marginLeft: 50}}>
      <h1>Resource 추가</h1>
      image : <input type="file" name='imageFile' onChange={handleFileChange} /><br/>
      name : <input type="text" name='name' value={resource.name} onChange={handleValueChenge} /><br/>
      birthday : <input type="text" name='birthday' value={resource.birthday} onChange={handleValueChenge} /><br/>
      gender : <input type="text" name='gender' value={resource.gender} onChange={handleValueChenge} /><br/>
      job : <input type="text" name='job' value={resource.job} onChange={handleValueChenge} /><br/>
      <button onClick={handleSubmit}>Add Resource</button>
    </div>
  )
}

export default ResourceAdd