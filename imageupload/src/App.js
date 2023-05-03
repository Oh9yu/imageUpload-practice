import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageCard from "./ImageCard";

function App() {
  const [inputValue, setInputValue] = useState();
  const [src, setSrc] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageData = reader.result;
      setInputValue(imageData);
    };
  };

  useEffect(() => {
    fetch("http://10.58.52.82:2000/image")
      .then((res) => res.json())
      .then((data) => setSrc(data));
  }, []);

  const clickHandler = () => {
    fetch("http://10.58.52.82:2000/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image: inputValue }),
    })
      .then((res) => res.json())
      .then((res) => setSrc(res.data));
  };

  console.log(src);

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
  width: 1024px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImageSection = styled.div`
  margin-top: 100px;
  width: 1024px;
  display: flex;
  flex-wrap: wrap;
`;

const FileInput = styled.input``;

const Btn = styled.button`
  height: 30px;
`;
