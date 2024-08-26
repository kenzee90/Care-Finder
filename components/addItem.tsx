"use client";
import { useState, useRef } from 'react';
import { Label, TextInput, Button } from "flowbite-react";
import { addHospital } from '@/utils/service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AddItem {
    name: string;
    description: string;
    state: string;
  }
const AddItem = () => {
    const [value, setValue] = useState<AddItem>({
        name: '',
        description: '',
        state: '',
    });
    const modules = {
        toolbar: [
          [{ 'header': [1, 2,  false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          
        ]
    }
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      addHospital(value.name, value.description, value.state);
      setValue({ name: "", description: "", state: "" }); // Clear the form
    };
    const quillRef = useRef<ReactQuill>(null);
    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-[70vw] py-5'>
           
            <div className='w-full'>
                <div className="mb-2 block">
                <Label htmlFor="base" value="Hospital Name" />
                </div>
                <TextInput id="base" type="text" 
                 value={value.name}
                 onChange={(e) => setValue({ ...value, name: e.target.value })}
                sizing="md" 
                className='mb-2'/>
                <div className="mb-2 block">
                <Label htmlFor="base2" value="Description" />
                </div>
                <ReactQuill
                    theme='snow'
                    value={value.description}
                    onChange={(content) => setValue((prevValue) => ({ ...prevValue, description: content }))}
                    modules={modules}
                    ref={quillRef}
                />
                <div className="mb-2 block">
                <Label htmlFor="base3" value="State" />
                </div>
                <TextInput id="base3" type="text" 
                 value={value.state}
                 onChange={(e) => setValue({ ...value, state: e.target.value })}
                sizing="md" 
                className='mb-2'/>
            </div>
            <Button type="submit" size="md">Add Item</Button>
        </form>
    );
};

export default AddItem;
