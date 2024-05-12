import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { addNote, addTag } from "../../redux/noteSlice";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./AddNote.css";

// Define the types for the props
interface AddNoteProps {
  onClose: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("#FFC2C2");
  const [tagList, setTagList] = useState<string[]>([]);
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const [tagsGuide, setTagsGuide] = useState<string>(""); // 태그 입력 안내 메시지 상태

  const handleFocus = (field: string) => {
    if (field === "title") {
      setTitleError("");
    }
  };

  const handleTagsFocus = () => {
    setTagsGuide(
      "엔터를 입력하여 태그를 등록할 수 있습니다. 한번 더 누르면 태그가 삭제됩니다.",
    );
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value); // 태그 입력 상태 업데이트
    setTagsGuide(""); // 안내 메시지 숨김
  };

  const handleContentChange = (content: string) => {
    setContent(content);
    setContentError(""); // 내용을 변경할 때 에러 메시지 초기화
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") setTitleError("");

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "tags":
        handleTagInputChange(e); // 태그 입력 변경 핸들링
        break;
      default:
        break;
    }
  };

  const colors = ["#FFC2C2", "#FDF6D6", "#A1FFDE", "#B5C1FF"];

  const handleSaveNote = () => {
    let isValid = true;
    // 입력값 검증
    if (!title.trim()) {
      setTitleError("✔️ 노트 제목을 적어주세요.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!content.trim()) {
      setContentError("✔️ 노트 내용을 적어주세요. ");
      isValid = false;
    } else {
      setContentError("");
    }

    if (isValid) {
      const newNote = {
        title: title,
        content: content,
        tags: tagList,
        color: selectedColor,
        createdTime: new Date().toISOString(),
      };

      dispatch(addNote(newNote));
      tagList.forEach((tag) => {
        dispatch(addTag(tag));
      });

      // 상태 초기화
      setTitle("");
      setContent("");
      setTags("");
      setSelectedColor("#FFC2C2");
      setTagList([]);
      onClose();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tags.trim();
      if (trimmedTag !== "") {
        setTagList((prevTagList) => [...prevTagList, trimmedTag]);
        setTags("");
      }
    }
  };

  const handleTagRemove = (indexToRemove: number) => {
    setTagList(tagList.filter((_, index) => index !== indexToRemove));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>노트 생성하기</h3>
        <input
          name="title"
          type="text"
          value={title}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder="제목"
        />
        {titleError && (
          <div className="input-error">
            <p>{titleError}</p>
          </div>
        )}

        <div className="color-picker">
          {colors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                margin: "5px",
                border: selectedColor === color ? "2px solid black" : "none",
              }}
              onClick={() => {
                setSelectedColor(color);
              }}
            />
          ))}
        </div>
        <style>{`.ql-editor { background-color: ${selectedColor}; }`}</style>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          placeholder="여기에 내용을 적어주세요."
        />
        {contentError && (
          <div className="input-error">
            <p>{contentError}</p>
          </div>
        )}

        <div className="tags">
          {tagList.map((tag, index) => (
            <div
              key={index}
              className="tag-item"
              onClick={() => handleTagRemove(index)}
            >
              {tag}
            </div>
          ))}
        </div>
        <input
          name="tags"
          type="text"
          value={tags}
          onChange={handleTagInputChange}
          onFocus={handleTagsFocus}
          onKeyPress={handleKeyPress}
          placeholder="태그를 입력해주세요."
        />
        {tagsGuide && (
          <div className="input-guide">
            <p>{tagsGuide}</p>
          </div>
        )}

        <div className="buttons">
          <button onClick={handleSaveNote}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
