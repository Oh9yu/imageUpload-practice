import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  console.log(inputValue);

  const clickHandler = () => {
    fetch("http://10.58.52.82:2000/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image: inputValue }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ok") {
          fetch("http://10.58.52.82:2000/image")
            .then((res) => res.json())
            .then((data) => setSrc(data));
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <FileInput type="file" onChange={handleFileUpload} />
        <Btn onClick={clickHandler}>Submit</Btn>
      </Wrapper>
      <ImageSection>
        {src?.map((data) => {
          return (
            <ImageCard>
              <Content src={data.image} key={data._id} />
            </ImageCard>
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

const ImageCard = styled.div`
  width: 150px;
  margin: 10px;
`;

const Content = styled.img`
  width: 100%;
  border-radius: 10px;
`;
