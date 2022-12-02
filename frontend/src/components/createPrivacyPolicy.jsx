import React, { useEffect, useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, EditorState } from "draft-js";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/dmca.css";

function CreatePrivacyPolicy(){

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    console.log(state);
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const createMarkup = () => {
    
        fetch("/api/admin/update/privacyPolicy", {method: "POST", body: JSON.stringify({"html": DOMPurify.sanitize(convertedContent)}), headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
          console.log("Entered");
        })
        .catch(err => {
            console.log(err);
        })
  }
  

  return (
    <React.Fragment>
      <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
        />
    <button className="submitButton" onClick={createMarkup}>Save Changes</button>
    </React.Fragment>
  )
}

export default CreatePrivacyPolicy;
