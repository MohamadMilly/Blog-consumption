import { useNavigate } from "react-router";
import { useChangePassword } from "../hooks/useChangePassword";
import { PasswordField } from "./PasswordField";

export function ChangePasswordForm() {
  const { changePassword, error, isLoading } = useChangePassword();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await changePassword(
        data.password,
        data.newPassword,
        data.confirmPassword
      );
      navigate("/me/settings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form method="post" onSubmit={handleSubmit}>
        <PasswordField id="password" name="password" label="Password" />
        <PasswordField
          id="newPassword"
          name="newPassword"
          label="New password"
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm new password"
        />
        <button type="submit" disabled={isLoading}>
          Confirm
        </button>
      </form>
      {error && <p>Error : {error}</p>}
      {isLoading && <p>Changing the password...</p>}
    </main>
  );
}
