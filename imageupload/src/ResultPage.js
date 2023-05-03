import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ResultPage = () => {
  const [src, setSrc] = useState([]);
  useEffect(() => {
    fetch("http://10.58.52.82:2000/image")
      .then((res) => res.json())
      .then((data) => setSrc(data));
  }, []);

  return (
    <Container>
      {src?.map((data) => {
        return <Content src={data.image} key={data._id} />;
      })}
    </Container>
  );
};

export default ResultPage;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 800px;
`;

const Content = styled.img`
  margin: 10px;
  width: 150px;
`;
