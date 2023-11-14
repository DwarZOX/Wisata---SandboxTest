import { useEffect, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import PropTypes from "prop-types";

function TextEditor({value,onChange}) {
	const [editor, setEditor] = useState('');

	useEffect(() => {
		if (editor && value) {
			editor.setData(value);
		}
	}, [editor, value]);
	return (
        <div className='rounded-lg border-[1px] p-2'>
		<CKEditor
			editor={ClassicEditor}
			data={value}
			onChange={(_, editor) => {
				const data = editor.getData();
				onChange(data);
			}}
		/></div>
	);
}

TextEditor.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func
}

export default TextEditor;