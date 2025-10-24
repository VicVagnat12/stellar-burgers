import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/user/user-slice';
import { TRegisterData } from '@api';
import { updateUserData } from '../../services/user/actions';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  if (!user) return null;

  const [formValue, setFormValue] = useState<TRegisterData>({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  }, [user]);

  const formValueUI = useMemo(
    () => ({
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    }),
    [formValue.name, formValue.email, formValue.password]
  );

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserData(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValueUI}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
