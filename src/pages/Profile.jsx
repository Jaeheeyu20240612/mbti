import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../api/auth";
import styled from "styled-components";

const Profile = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("users");
  const token = user?.accessToken;
  const [formData, setFormData] = useState({
    avatar: null,
    nickname: ""
  });

  const { mutate } = useMutation({
    mutationFn: ({ newAvatar, newNickname, token }) => updateProfile(newAvatar, newNickname, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "avatar" ? files[0] : value
    }));
  };

  //
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!user?.accessToken) {
      return;
    }
    console.log("업데이틀할 프로필 자료:", {
      newAvatar: formData.avatar,
      newNickname: formData.nickname,
      token: token
    });
    mutate({
      newAvatar: formData.avatar,
      newNickname: formData.nickname,
      token: token
    });
  };

  return (
    <ProfileDiv>
      <h1>Mypage</h1>
      <img className="w-60 h-60" src={user?.avatar} alt="User Avatar" />
      <p className="mb-3">닉네임 : {user?.nickname}</p>
      <form className="flex flex-col mb-4" onSubmit={handleUpdateProfile}>
        <input
          name="nickname"
          onChange={handleInputChange}
          className="bg-transparent text-gray-400 mb-4 shadow-lg"
          placeholder="수정할 닉네임을 작성해주세요"
          type="text"
          value={formData.nickname}
        />
        <input
          name="avatar"
          onChange={handleInputChange}
          className="bg-transparent text-gray-400 mb-4 shadow-lg"
          type="file"
        />
        <button type="submit" className="text-center">
          수정
        </button>
      </form>
    </ProfileDiv>
  );
};

export default Profile;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 115px);
  overflow: hidden;
  margin: auto;

  .w-60 {
    width: 240px;
  }

  .h-60 {
    height: 240px;
  }
`;
