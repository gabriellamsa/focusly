import { useState } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";

function NewPage() {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleSendMessage = () => {
    if (text.trim() === "" && attachments.length === 0) return; // block empty send

    // add messages and attachments to history
    setMessages((prev) => [...prev, { text, attachments, id: Date.now() }]);

    // clean editor and attachments
    setText("");
    setAttachments([]);
  };

  const handleCancel = () => {
    setText("");
    setAttachments([]);
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
        className="p-4 bg-gray-900 text-gray-200 rounded-lg mb-4 border border-gray-700"
      >
        <p className="mb-2">{msg.text || "No text"}</p>
        {msg.attachments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white mb-4">New Page</h1>

      {/* text editor */}
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4 relative">
        <textarea
          value={text}
          onChange={handleTextChange}
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
              Send
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
