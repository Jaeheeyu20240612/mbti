import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateProfile } from "../api/auth";
import styled from "styled-components";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);
  console.log(token);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = await updateProfile(avatar, nickname, token);
    setUser((prev) => ({
      ...prev,
      avatar: updatedProfile.avatar,
      nickname: updatedProfile.nickname
    }));
  };
  return (
    <div className="w-3/5 flex flex-col justify-center items-center">
      <ProfileDiv className="flex flex-col">
        Mypage
        <img className="w-60 h-60" src={user?.avatar} alt="" />
        <p className="mb-3">닉네임 : {user?.nickname}</p>
        <div>
          <form className="flex flex-col mb-4" onSubmit={handleUpdateProfile}>
            <input
              onChange={(e) => setNickname(e.target.value)}
              className="bg-transparent text-gray-400 mb-4 shadow-lg"
              placeholder="수정할 닉네임을 작성해주세요"
              type="text"
            />
            <input
              onChange={(e) => setAvatar(e.target.files[0])}
              className="bg-transparent text-gray-400 mb-4 shadow-lg"
              type="file"
            />
            <button className="text-center">수정</button>
          </form>
        </div>
      </ProfileDiv>
    </div>
  );
};

export default Profile;

const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 115px);
  overflow: hidden;
  margin: auto;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input[type="text"],
  input[type="file"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:first-of-type {
      background: #007bff;
      color: white;
    }
    &:last-of-type {
      background: #ccc;
    }
  }
`;
