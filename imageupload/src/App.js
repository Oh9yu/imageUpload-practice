import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageCard from "./ImageCard";

function App() {
  const [inputImage, setInputImage] = useState();
  const [src, setSrc] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const MAX_WIDTH = 600;
      const MAX_HEIGHT = 480;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg");
      setInputImage(dataUrl);
      console.log(dataUrl);
    };
    img.src = URL.createObjectURL(file);
  };

  const clickHandler = () => {
    fetch("http://10.58.52.52:2000/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image: inputImage }),
    })
      .then((res) => res.json())
      .then((res) => setSrc(res.data));
  };

  useEffect(() => {
    fetch("http://10.58.52.52:2000/image")
      .then((res) => res.json())
      .then((data) => setSrc(data));
  }, []);

  return (
    <Container>
      <Wrapper>
        <FileInput type="file" onChange={handleFileUpload} />
        <Btn onClick={clickHandler}>Submit</Btn>
      </Wrapper>
      <ImageSection>
        {src?.map((data) => {
          return (
            <ImageCard
              key={data.imageId}
              id={data.imageId}
              img={data.image}
              setSrc={(e) => {
                setSrc(e);
              }}
            />
          );
        })}
      </ImageSection>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: 2px solid #ddd;
`;

const ImageSection = styled.div`
  margin-top: 100px;
  width: 1024px;
  min-height: 500px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  border: 2px solid #ddd;
  @media screen and (max-width: 1024px) {
    width: 800px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 860px) {
    width: 600px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FileInput = styled.input``;

const Btn = styled.button`
  height: 30px;
`;
