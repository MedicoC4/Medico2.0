import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { Upload, Modal } from "antd";

const App = ({ FileAdd }) => {
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    setPreviewImage(file.url || file.preview);
    setIsModalOpen(true);
  };

  const onChange = ({ fileList }) => {
    setFileList(fileList);

    if (fileList.length > 0) {
      const latestUploadedFile = fileList[fileList.length - 1];

      if (latestUploadedFile && latestUploadedFile.originFileObj) {
        FileAdd(latestUploadedFile.originFileObj);
      }
    }
  };

  return (
    <>
      <ImgCrop rotate>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
          accept=".jpg,.jpeg,.png"
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <Modal
        title="Image Preview"
        visible={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default App;
