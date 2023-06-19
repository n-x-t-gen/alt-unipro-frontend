import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { User } from "../../types";
import styles from "./UserProfileForm.module.css";
import { useNavigate } from "react-router-dom";
import UserProfileSubmtionSuccessToast from "../UserProfileSubmtionSuccessToast/UserProfileSubmitionSuccessToast";
import UserProfileSubmitionFailToast from "../UserProfileSubmitionFailToast/UserProfileSubmitionFailToast";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const UserProfileForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [updatedUserState, setUpdatedUserState] = useState(false);
  const dataFromStorage = sessionStorage.getItem("user");
  let token = "";
  let userEmail = "";
  if (dataFromStorage) {
    const parsedData = JSON.parse(dataFromStorage);
    token = parsedData.token;
    userEmail = parsedData.email;
  }

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: token,
      Access: serverSideAccessToken,
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${url}/admin/useremail/${userEmail}`,
          config
        );
        const userData = response.data[0];
        setUser(userData);
        setUpdatedUser(userData);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [id]: value,
        };
      }
      return null;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (user && updatedUser) {
        const response = await axios.put(
          `${url}/admin/user/${user.id}`,
          updatedUser,
          config
        );
        setUpdatedUserState(true);

        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.UserProfileForm}>
      <div className={styles.SubmitionStatusToast}>
        {updatedUserState && <UserProfileSubmtionSuccessToast />}
        {/* {updatedUserState ? <UserProfileSubmtionSuccessToast /> : <UserProfileSubmitionFailToast/>} */}
      </div>

      <Form onSubmit={handleSubmit}>
        {user && (
          <>
            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.name || ""}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="birthdate">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.birthdate || ""}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="sex">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.sex || ""}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedUser?.email || ""}
                onChange={handleInputChange}
                className={styles.AvailableInputOption}
              />
            </Form.Group>

            <Form.Group controlId="contact">
              <Form.Label>Contato</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.contact || ""}
                onChange={handleInputChange}
                className={styles.AvailableInputOption}
              />
            </Form.Group>

            <Form.Group controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.cpf || ""}
                readOnly
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className={styles.SubmitDataButton}
            >
              Alterar
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default UserProfileForm;
