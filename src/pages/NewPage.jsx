import { useState } from "react";
import { FiSend, FiPaperclip, FiEdit, FiTrash2 } from "react-icons/fi";

function NewPage() {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editMessageId, setEditMessageId] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleSendMessage = () => {
    if (text.trim() === "" && attachments.length === 0) return;

    if (editMessageId !== null) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editMessageId ? { ...msg, text, attachments } : msg
        )
      );
      setEditMessageId(null);
    } else {
      setMessages((prev) => [...prev, { id: Date.now(), text, attachments }]);
    }

    setText("");
    setAttachments([]);
  };

  const handleCancel = () => {
    setText("");
    setAttachments([]);
    setEditMessageId(null);
  };

  const handleRemoveMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleDirectEdit = (id, newText) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
    );
  };

  const autoResize = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const renderAttachments = () => {
    return attachments.map((file, index) => (
      <div key={index} className="relative group">
        {file.type.startsWith("image/") ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Attachment"
            className="w-full max-h-64 object-contain rounded-lg border border-gray-600"
          />
        ) : (
          <div className="p-4 bg-gray-700 rounded-lg text-gray-300">
            {file.name}
          </div>
        )}
      </div>
    ));
  };

  const renderMessages = () => {
    return messages.map((msg) => (
      <div
        key={msg.id}
        className="relative p-4 bg-gray-900 text-gray-200 rounded-lg mb-4 border border-gray-700 group"
      >
        <textarea
          value={msg.text}
          onChange={(e) => handleDirectEdit(msg.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) e.preventDefault();
          }}
          ref={(textarea) => autoResize(textarea)}
          className="w-full bg-transparent text-gray-200 border-none focus:outline-none resize-none overflow-hidden"
        ></textarea>

        {msg.attachments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {msg.attachments.map((file, index) => (
              <div key={index} className="relative group">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Attachment"
                    className="w-full max-h-64 object-contain rounded-lg border border-gray-600"
                  />
                ) : (
                  <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
                    {file.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* edit and remove icons */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditMessageId(msg.id)}
            className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => handleRemoveMessage(msg.id)}
            className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">New Page</h1>

      {/* text editor */}
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4 relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your notes here..."
          className="w-full h-32 p-2 bg-transparent text-gray-200 border-none focus:outline-none resize-none"
        ></textarea>

        {/* anexos */}
        <div className="mt-4">{renderAttachments()}</div>

        {/* buttons inside the text editor */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center cursor-pointer text-gray-300 hover:text-white">
            <FiPaperclip className="text-2xl" />
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <FiSend className="mr-2" />
              {editMessageId ? "Update" : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* sent messages */}
      <div>{renderMessages()}</div>
    </div>
  );
}

export default NewPage;
