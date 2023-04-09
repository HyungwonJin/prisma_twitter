import { useForm } from "react-hook-form";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";

export default function Login() {
  const { register } = useForm();
  return (
    <div>
      <form>
        <Input
          register={register("ID", { required: true })}
          required
          name="id"
          type="id"
          label="ID"
        />
        <Input
          register={register("password", { required: true })}
          required
          name="password"
          type="password"
          label="Password"
        />
        <Button text="Login" />
      </form>
      <Link href="/create-account">
        <span>혹시 아직 회원이 아니신가요?</span>
      </Link>
    </div>
  );
}
