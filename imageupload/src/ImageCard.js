import React from "react";
import styled from "styled-components";
import { FiXCircle } from "react-icons/fi";

const ImageCard = ({ id, img, setSrc }) => {
  const deleteHandler = () => {
    fetch("http://10.58.52.52:2000/image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageId: id }),
    })
      .then((res) => res.json())
      .then((res) => setSrc(res.data));
  };

  return (
    <ImageSection>
      <FiXCircle
        style={{
          color: "#fff",
          width: "32px",
          height: "32px",
          position: "absolute",
          top: 5,
          right: 5,
          cursor: "pointer",
        }}
        onClick={deleteHandler}
      />
      <Content src={img} />
    </ImageSection>
  );
};

export default ImageCard;

const ImageSection = styled.div`
  position: relative;
  width: 150px;
  max-height: 150px;
  margin: 10px;
  background-color: #f1f1f1;
`;

const Content = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 10px;
`;
