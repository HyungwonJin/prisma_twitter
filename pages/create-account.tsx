import { useForm } from "react-hook-form";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";
import useMutation from "../lib/client/useMutation";

interface EnterForm {
  userId: string;
  password: string;
}

export default function CreateAccount() {
  const [create, { loading, data, error }] = useMutation(
    "/api/users/create-account"
  );
  const { register, handleSubmit } = useForm<EnterForm>();
  const onValid = (inputData: EnterForm) => {
    create(inputData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("userId", { required: true })}
          required
          name="userId"
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
        <Button text={loading ? "Loading..." : "Create Account"} />
      </form>
      <Link href="/log-in">
        <span>이미 회원이신가요?&rarr;</span>
      </Link>
    </div>
  );
}
