import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { API_KEY, INITIAL_SHOW_INFO_MODAL_DATA, OMDB_URL, ShowData } from "../AppConstants";

const ModalBackground = styled.div`
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  padding: 16px;
  background-color: white;
  max-width: 70%;
  max-height: 70%;
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 30%),
    0px 1px 1px 0px rgb(0 0 0 / 30%), 0px 1px 3px 0px rgb(0 0 0 / 30%);
`;

const VerticalDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 65%;
`;

const ShowPoster = styled.img`
  display: block;
  width: 100%;
  height: auto;
  padding-top: 8px;
  padding-bottom: 16px;
`;

const Title = styled.div`
  font-size: 24px;
  padding-bottom: 8px;
`;

const Spacer = styled.div`
  height: 8px;
  width: 24px;
`;

interface ShowInfoModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  imdbID: string;
}

const ShowInfoModal = ({ isOpen, setIsOpen, imdbID }: ShowInfoModalProps) => {
  const [showData, setShowData] = useState(INITIAL_SHOW_INFO_MODAL_DATA);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && imdbID !== "") {
      const url = `${OMDB_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
      axios.get(url).then((response) => {
        if (response.data["Response"] === "True") {
          setShowData(response.data as ShowData);
        } else {
          console.error("error getting show data");
        }
      });
    }
  }, [isOpen, imdbID]);

  const handleOnClick = (event: React.MouseEvent) => {
    if (modalContainerRef.current) {
      const modalContainerRect = modalContainerRef.current.getBoundingClientRect();
      if (
        event.clientX < modalContainerRect.x ||
        event.clientX > modalContainerRect.x + modalContainerRect.width ||
        event.clientY < modalContainerRect.y ||
        event.clientY > modalContainerRect.y + modalContainerRect.height
      ) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <ModalBackground onClick={handleOnClick}>
          <ModalContainer ref={modalContainerRef}>
            <VerticalDiv>
              <Title>
                <b>{showData.Title}</b>
              </Title>
              <div>
                <b>Rating:</b> {showData.imdbRating}
              </div>
              <ShowPoster src={showData.Poster} />
            </VerticalDiv>
            <Spacer />
            <VerticalDiv>
              <div>
                <b>Year:</b> {showData.Year}
              </div>
              <Spacer />
              <div>
                <b>Genre:</b> {showData.Genre}
              </div>
              <Spacer />
              <div>
                <b>Type:</b> {showData.Type[0].toUpperCase()}
                {showData.Type.substr(1)}
              </div>
              <Spacer />
              <div>
                <b>Plot:</b>
              </div>
              <Spacer />
              <div>{showData.Plot}</div>
            </VerticalDiv>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default ShowInfoModal;
