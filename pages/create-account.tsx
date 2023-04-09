import { useForm } from "react-hook-form";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";

export default function CreateAccount() {
  const { register } = useForm();
  return (
    <div>
      <form>
        <Input
          register={register("userId", { required: true })}
          required
          name="userName"
          label="User Name"
          type="text"
        />
        <Input
          register={register("password", { required: true })}
          label="Pass Word"
          type="text"
          required
          name="password"
        />
        <Button text="Create Account" />
      </form>
      <Link href="/log-in">
        <span>이미 회원이신가요?&rarr;</span>
      </Link>
    </div>
  );
}
