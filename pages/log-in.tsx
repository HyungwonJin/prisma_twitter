import { useForm } from "react-hook-form";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";
import useMutation from "../lib/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface LoginType {
  userId: string;
  password: string;
}

interface MutationResult {
  ok: boolean;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginType>();
  const [login, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/log-in");
  const onValid = (inputData: LoginType) => {
    login(inputData);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [router, data]);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("userId", { required: true })}
          required
          name="userId"
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
        <Button text={loading ? "loading..." : "Login"} />
      </form>
      <Link href="/create-account">
        <span>혹시 아직 회원이 아니신가요?</span>
      </Link>
    </div>
  );
}
