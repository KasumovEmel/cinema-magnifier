import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import FavoriteService from "../../services/FavoriteServices";
import { CardMovieProps } from "./StartPage";
import { Button } from "antd";

const BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "?api_key=cc05b5a727e14d0c6339bc25125883bd";

const MovieCardWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 40px 0 40px 0;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 17px;
  height: 70px;
`;

const Header = styled.h3`
  color: #002640;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  border-radius: 15px;
  transition: all 0.3s;
  :hover {
    transition: 0.3s;
    transform: scale(1.1);
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 150px;
  margin: 30px 0 15px 0;
  padding: 0 10px 0 10px;
  opacity: 0.6;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  font-size: 17px;
`;

const SVG = styled.div.attrs((props: { isLiked: boolean }) => props)`
  #heart {
    fill: ${(props) => (props.isLiked ? `red` : `white`)};
  }
  display: flex;
  justify-content: center;
  width: 130px;
`;

const CustomButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

const MovieCard: FC<CardMovieProps> = ({
  title,
  popularity,
  poster_path,
  overview,
  isLiked,
  id,
}) => {
  const [liked, setLiked] = useState(false);
  console.log(isLiked);
  const onLikeClick = useCallback(() => {
    setLiked((prevState) => !prevState);

    FavoriteService.addFavoriteElement(
      { title, popularity, poster_path, overview, id },
      "movies"
    );
  }, [setLiked, title, popularity, poster_path, overview, id]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <MovieCardWrapper>
      <HeaderContainer>
        <Header>{title}</Header>
      </HeaderContainer>
      <ImgContainer>
        <Img src={BASE_URL + poster_path + API_KEY} width={250} height={350} />
      </ImgContainer>
      <Description>
        <p>{overview}</p>
      </Description>
      <Rating>
        <h4>Rating {popularity}</h4>
      </Rating>

      <CustomButton type="primary" onClick={onLikeClick}>
        <SVG isLiked={liked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 512 512"
          >
            <title>Heart</title>
            <path
              id="heart"
              d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </SVG>
      </CustomButton>
    </MovieCardWrapper>
  );
};

export default React.memo(MovieCard);
