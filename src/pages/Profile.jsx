import React, { useEffect, useState } from "react";
import defaultProfile from "../assets/defaultProfile.jpg";
import { getUserProfile, updateProfile } from "../api/auth";
import useStore from "../data/store";
import styled from "styled-components";

const Profile = () => {
  const { user, setUser, setIsAuthenticated } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setIsAuthenticated: state.setIsAuthenticated
  }));

  const [newNickname, setNewNickname] = useState("");
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const userData = await getUserProfile(token);
          setUser({
            userId: userData.id,
            nickname: userData.nickname,
            avatar: userData.avatar
          });
        }
      } catch (error) {
        console.error("사용자 데이터 로딩 실패:", error);
        // setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, [setUser, setIsAuthenticated]);

  const handleInputChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = await updateProfile(file, newNickname);

      if (updatedUserData.success) {
        setUser({
          ...user,
          nickname: updatedUserData.nickname || user.nickname,
          avatar: updatedUserData.avatar || user.avatar
        });
        setNewNickname("");
        setFile(null);
        setIsEditing(false);
      } else {
        console.error("프로필 업데이트에 실패했습니다:", updatedUserData.message);
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };
  return (
    <ProfileDiv>
      <div className="flex flex-col items-center">
        <p className="text-2xl">Profile</p>
        <img className="w-72 h-72 object-cover" src={user?.avatar ? user.avatar : defaultProfile} alt="Profile" />
        <div className="flex flex-row justify-between items-center w-full max-w-md">
          <p>닉네임: {user?.nickname}</p>
          <button onClick={() => setIsEditing(true)} className=" text-white py-2 px-4 rounded">
            ✒️
          </button>
        </div>
      </div>

      {/* 모달 */}
      {isEditing && (
        <ModalContainer>
          <ModalContent>
            <h2>프로필 수정</h2>
            <form onSubmit={handleProfileUpdate}>
              <input type="text" value={newNickname} onChange={handleInputChange} placeholder="새 닉네임" />
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <button type="submit">저장</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                취소
              </button>
            </form>
          </ModalContent>
        </ModalContainer>
      )}
    </ProfileDiv>
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
